using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicChat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PacientesController : ControllerBase
    {
        private readonly IPacienteService _pacienteService;
        public PacientesController(IPacienteService pacienteService)
        {
            _pacienteService = pacienteService;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                // Atribui a variavel pacientes todos os Pacientes
                var pacientes = await _pacienteService.GetAllPacientesAsync();
                
                // Caso não existam pacientes retorna NotFound
                if (pacientes == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return Ok(pacientes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Pacientes. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var paciente = await _pacienteService.GetPacienteByIdAsync(id);
                if (paciente == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar pacientes. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var paciente = await _pacienteService.GetAllPacientesByNomeAsync(nome);
                if (paciente == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar o Paciente. Erro: {ex.Message}");
            }
        }

        [HttpGet("{telemovel}/telemovel")]
        public async Task<IActionResult> GetByTelemovel(int telemovel)
        {
            try
            {
                var paciente = await _pacienteService.GetPacienteByTelemovelAsync(telemovel);
                if (paciente == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar o Paciente. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(PacienteDto model)
        {
            try
            {
                var paciente = await _pacienteService.AddPaciente(model);
                if (paciente == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar Paciente. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, PacienteDto model)
        {
            try
            {
                var paciente = await _pacienteService.UpdatePaciente(id, model);
                if (paciente == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Pacientes. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // Verifica se o Paciente existe
                var paciente = await _pacienteService.GetPacienteByIdAsync(id);
                if (paciente == null) return NoContent(); // Retorna StatusCode 204 - NoContent
                
                return await _pacienteService.DeletePaciente(id) 
                        ? Ok(new { mensagem = "Apagado"}) // retorna um objeto para o front end (boa prática)
                        : throw new Exception("Ocorreu algum problema ao tentar apagar o paciente!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Paciente. Erro: {ex.Message}");
            }
        }
    }
}
