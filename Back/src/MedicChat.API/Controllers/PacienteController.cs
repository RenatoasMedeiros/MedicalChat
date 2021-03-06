using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicChat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly IPacienteService _pacienteService;
        public PacienteController(IPacienteService pacienteService)
        {
            _pacienteService = pacienteService;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var pacientes = await _pacienteService.GetAllPacientesAsync();
                if (pacientes == null) return NotFound("Nenhum Paciente encontrado.");
                
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
                if (paciente == null) return NotFound("O Identificador indicado, não corresponde a nenhum Paciente.");
                
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
                if (paciente == null) return NotFound("O Nome indicado não corresponde a nenhum Paciente.");
                
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
                if (paciente == null) return NotFound("O Telemovel indicado não corresponde a nenhum Paciente.");
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar o Paciente. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Paciente model)
        {
            try
            {
                var paciente = await _pacienteService.AddPaciente(model);
                if (paciente == null) return BadRequest("Erro ao tentar adicionar Paciente.");
                
                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar Paciente. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Paciente model)
        {
            try
            {
                var paciente = await _pacienteService.UpdatePaciente(id, model);
                if (paciente == null) return BadRequest("Erro ao tentar atualizar Paciente.");
                
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
                return await _pacienteService.DeletePaciente(id) ? 
                        Ok("Apagado com sucesso.") : 
                        BadRequest("Paciente não apagado!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Paciente. Erro: {ex.Message}");
            }
        }
    }
}
