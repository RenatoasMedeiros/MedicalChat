using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MedicChat.Application.Contratos;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace MedicChat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MedicosController : ControllerBase
    {
        private readonly IMedicoService _medicoService;
        private readonly IMapper _mapper;
        private readonly SignInManager<Medico> _signInManager;
        private readonly UserManager<Medico> _userManager;
        private readonly IConfiguration _configuration;
        public MedicosController(IMedicoService medicoService, IMapper mapper, UserManager<Medico> userManager, SignInManager<Medico> signInManager, IConfiguration configuration)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _medicoService = medicoService;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var medicos = await _medicoService.GetAllMedicosAsync();
                if (medicos == null) return NoContent(); // Retorna StatusCode 204 - NoContent

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
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent

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
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent

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
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post(MedicoDto model)
        {
            try
            {
                var medico = await _medicoService.AddMedico(model);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return Ok(medico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, MedicoDto model)
        {
            try
            {
                var medico = await _medicoService.UpdateMedico(id, model);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent

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
                // Verifica se o Medico existe
                var medico = await _medicoService.GetMedicosByIdAsync(id);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent

                return await _medicoService.DeleteMedico(id)
                        ? Ok(new { mensagem = "Apagado" }) // retorna um objeto para o front end (boa prática)
                        : throw new Exception("Ocorreu algum problema ao tentar apagar o Médico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(MedicoLoginDto model)
        {
            try
            {
                var medico = await _userManager.FindByEmailAsync(model.Email); // Procura na base de dados o Email
                var result = await _signInManager.CheckPasswordSignInAsync(medico, model.Password, true); // Verifica de a password corresponde

                if (result.Succeeded) // caso o resultado dê sucesso
                {
                    var appMedico = await _userManager.Users.FirstOrDefaultAsync(m => m.NormalizedEmail == model.Email.ToUpper());
                    var medicoRetorno = _mapper.Map<MedicoLoginDto>(appMedico);

                    return Ok(new
                    {
                        token = GenerateJWToken(appMedico).Result, // gera o token - .Result é IMPORTANTE
                        medico = medicoRetorno
                    });
                }
                return Unauthorized(); // caso os dados estejam incorretos
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar efetuar o login. Erro: {ex.Message}");
            }
        }

        private async Task<string> GenerateJWToken(Medico medico)
        {
            try
            {
                var claims = new List<Claim> //Lista de claims
                {
                    new Claim(ClaimTypes.NameIdentifier, medico.Id.ToString()),
                    new Claim(ClaimTypes.Name, medico.Email)
                };

                var roles = await _userManager.GetRolesAsync(medico); // atribui a variavel roles todas a roles do medico

                foreach (var role in roles){
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); // CRIPTOGRAFIA HmacSha512Signature

                // informações do token
                var tokenDescriptor = new SecurityTokenDescriptor{
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(token);
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}
