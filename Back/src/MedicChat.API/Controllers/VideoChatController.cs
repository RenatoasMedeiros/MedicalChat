using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Domain.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicChat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoChatController : ControllerBase
    {
        private readonly IVideoChatService _videoChatService;
        public VideoChatController(IVideoChatService videoChatService)
        {
            _videoChatService = videoChatService;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllVideoChatAsync()
        {
            try
            {
                var videoChat = await _videoChatService.GetAllVideoChatAsync();
                if (videoChat == null) return NotFound("Nenhuma Video Chamada encontrado.");
                
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
                if (videoChat == null) return NotFound("O Identificador indicado, não corresponde a nenhuma Video Chamada.");
                
                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar video chamada. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nomeMedico}/nomeMedico")]
        public async Task<IActionResult> GetAllVideoChatByNomeMedicoAsync(string nomeMedico)
        {
            try
            {
                var videoChat = await _videoChatService.GetAllVideoChatByNomeMedicoAsync(nomeMedico);
                if (videoChat == null) return NotFound("O Médico indicado não corresponde a nenhuma Video Chamada.");
                
                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nomePaciente}/nomePaciente")]
        public async Task<IActionResult> GetAllVideoChatByNomePacienteAsync(string nomePaciente)
        {
            try
            {
                var videoChat = await _videoChatService.GetAllVideoChatByNomePacienteAsync(nomePaciente);
                if (videoChat == null) return NotFound("O Paciente indicado não corresponde a nenhuma Video Chamada.");
                
                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(VideoChat model)
        {
            try
            {
                var videoChat = await _videoChatService.AddVideoChat(model);
                if (videoChat == null) return BadRequest("Erro ao tentar adicionar a Video Chamada.");
                
                return Ok(videoChat);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar a Video Chamada. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, VideoChat model)
        {
            try
            {
                var videoChat = await _videoChatService.UpdateVideoChat(id, model);
                if (videoChat == null) return BadRequest("Erro ao tentar atualizar a Video Chamada.");
                
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
                return await _videoChatService.DeleteVideoChat(id) ? 
                        Ok("Apagado com sucesso.") : 
                        BadRequest("Video Chamada não apagada!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar a Video Chamada. Erro: {ex.Message}");
            }
        }
    }
}
