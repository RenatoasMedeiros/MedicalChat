using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Domain.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using Microsoft.Extensions.Logging;
using FluentEmail.Smtp;
using System.Net;
using FluentEmail.Core;
using System.Globalization;
using MedicChat.Application.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace MedicChat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VideoChatController : ControllerBase
    {
        private readonly IVideoChatService _videoChatService;
        private readonly IMailSenderService _mailSenderService;
        private readonly IMapper _mapper;
        public VideoChatController(IVideoChatService videoChatService, IMailSenderService mailSenderService, IMapper mapper)
        {
            _videoChatService = videoChatService;
            _mailSenderService = mailSenderService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVideoChatAsync()
        {
            try
            {
                var videoChat = await _videoChatService.GetAllVideoChatAsync();
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar videoChat. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVideoChatByIdAsync(int id)
        {
            try
            {
                var videoChat = await _videoChatService.GetVideoChatByIdAsync(id);
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar video chamada. Erro: {ex.Message}");
            }
        }

        [HttpGet("paciente/{pacienteId}")]
        public async Task<IActionResult> GetAllVideoChatsByPacienteIdAsync(int pacienteId)
        {
            try
            {
                var videoChat = await _videoChatService.GetAllVideoChatsByPacienteIdAsync(pacienteId);
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpGet("medico/{medicoId}")]
        public async Task<IActionResult> GetAllVideoChatsByMedicoIdAsync(int medicoId)
        {
            try
            {
                var videoChat = await _videoChatService.GetAllVideoChatsByMedicoIdAsync(medicoId);
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(VideoChatDto model)
        {
            try
            {
                // Dado o Objeto medicoDto é mapeado os medicos
                var videoChat = await _videoChatService.AddVideoChat(model);
                videoChat.DataInicio.AddHours(1); // Adiciona 1 hora
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                try 
                {
                    _mailSenderService.EnviarGmailConsultaAgendada(videoChat.Paciente.Email, videoChat.Paciente.Nome, videoChat.DataInicio);
                }
                catch(Exception ex) {
                    return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar a Video Chamada, email não enviado ao Paciente Erro: {ex.Message}");
                }

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar a Video Chamada. Erro: {ex.Message}");
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, VideoChatDto model)
        {
            try
            {
                var videoChat = await _videoChatService.UpdateVideoChat(id, model);
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                try 
                {
                    _mailSenderService.EnviarGmailConsultaAgendada(videoChat.Paciente.Email, videoChat.Paciente.Nome, videoChat.DataInicio);
                }
                catch(Exception ex) {
                    return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar a Video Chamada, email não enviado ao Paciente Erro: {ex.Message}");
                }

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpPut("enviarEmail/{id}")]
        public async Task<IActionResult> PutEnviaEmail(int id, VideoChatDto model)
        {
            try
            {
                var videoChat = await _videoChatService.UpdateVideoChat(id, model);
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                try 
                {
                    _mailSenderService.EnviarGmailConsultaIniciada(videoChat.Paciente.Email, videoChat.Paciente.Nome, videoChat.Token, videoChat.Id);
                }
                catch(Exception ex) {
                    return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar a Video Chamada, email não enviado ao Paciente Erro: {ex.Message}");
                }

                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // Verifica se a Consulta existe
                var videoChat = await _videoChatService.GetVideoChatByIdAsync(id);
                if (videoChat == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return await _videoChatService.DeleteVideoChat(id)
                        ? Ok(new { mensagem = "Apagado"}) // retorna um objeto para o front end (boa prática)
                        : throw new Exception("Ocorreu algum problema ao tentar apagar a consulta!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar a Video Chamada. Erro: {ex.Message}");
            }
        }
    }
}
