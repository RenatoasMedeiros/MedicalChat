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
    public class MedicosController : ControllerBase
    {
        private readonly IMedicoService _medicoService;
        public MedicosController(IMedicoService medicoService)
        {
            _medicoService = medicoService;

        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var medicos = await _medicoService.GetAllMedicosAsync();
                if (medicos == null) return NotFound("Nenhum medico encontrado.");
                
                return Ok(medicos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var medico = await _medicoService.GetMedicosByIdAsync(id);
                if (medico == null) return NotFound("O Identificador indicado, não corresponde a nenhum Médico.");
                
                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{especialidade}/especialidade")]
        public async Task<IActionResult> GetByEspecialidade(string especialidade)
        {
            try
            {
                var medico = await _medicoService.GetAllMedicosByEspecialidadeAsync(especialidade);
                if (medico == null) return NotFound("A Espespecialidade indicada não corresponde a nenhum Médico.");
                
                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var medico = await _medicoService.GetAllMedicosByNomeAsync(nome);
                if (medico == null) return NotFound("O Nome indicado não corresponde a nenhum Médico.");
                
                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Medico model)
        {
            try
            {
                var medico = await _medicoService.AddMedico(model);
                if (medico == null) return BadRequest("Erro ao tentar adicionar Médico.");
                
                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Medico model)
        {
            try
            {
                var medico = await _medicoService.UpdateMedico(id, model);
                if (medico == null) return BadRequest("Erro ao tentar atualizar Médico.");
                
                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar medicos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return await _medicoService.DeleteMedico(id) ? 
                        Ok("Deletado") : 
                        BadRequest("Medico não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar medicos. Erro: {ex.Message}");
            }
        }
    }
}
