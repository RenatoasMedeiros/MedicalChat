using System;
using System.Collections.Generic;
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
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Http.Headers;

namespace MedicChat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Define a rota
    [Authorize] // Todos os EndPoints Percição de autorização 
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
                // Atribui a medicos todos os médicos atravez do serviço _medicoService
                var medicos = await _medicoService.GetAllMedicosAsync();
                if (medicos == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return Ok(medicos); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) // Id do Médico
        {
            try
            {
                // Atribui a medico o médico dono do id passado, atravez do serviço _medicoService
                var medico = await _medicoService.GetMedicosByIdAsync(id);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return Ok(medico); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{especialidade}/especialidade")]
        public async Task<IActionResult> GetByEspecialidade(string especialidade) // Especialidade do Médico
        {
            try
            {
                // Atribui a medicos todos os médicos com a especialidade passada como parametro, atravez do serviço _medicoService
                var medicos = await _medicoService.GetAllMedicosByEspecialidadeAsync(especialidade);
                if (medicos == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return Ok(medicos); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome) // Nome do Médico
        {
            try
            {
                // Atribui a medicos todos os médicos com o nome passada como parametro, atravez do serviço _medicoService
                var medico = await _medicoService.GetAllMedicosByNomeAsync(nome);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return Ok(medico); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")] //Sómente utilizadores com permição de Admin podem realizar este endpoint
        public async Task<IActionResult> Post(MedicoDto model) // Recebe como parametro um MedicoDto
        {
            try
            {
                // Atribui a medico todo o model do MedicoDto passado como parametro
                var medico = await _medicoService.AddMedico(model);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return Ok(medico); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPost("uploadImagemMedico")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var arquivo = Request.Form.Files[0]; // Todo o arquivo vem como um array, logo o a variavem arquivo começa no [0]
                var nomePasta = Path.Combine("Resources", "ImagensMedico");

                //Caminho onde vai ser salvo
                var pathParaSalvar = Path.Combine(Directory.GetCurrentDirectory(), nomePasta);

                if(arquivo.Length > 0) // Se o arquivo existir
                {
                    // Nome do arquivo vem do header
                    var nomeArquivo = ContentDispositionHeaderValue.Parse(arquivo.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathParaSalvar, nomeArquivo.Replace("\"", " ").Trim()); //Substitui as aspas duplas por " ", e Trim para remover o espaço

                    //Guardamos o arquivo no stream
                    using(var stream = new FileStream(fullPath, FileMode.Create)) {
                        arquivo.CopyTo(stream);
                    }
                }

                return Ok(); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar inserir imagem. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")] // Editar o médico
        public async Task<IActionResult> Put(int id, MedicoDto model) // Recebe o id do médico e um model do Tipo MedicoDto
        {
            try
            {
                var medico = await _medicoService.UpdateMedico(id, model);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return Ok(medico); // retorna status code 200 (Ok) com o médico
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar medicos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")] // Eliminar o médico
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // Verifica se o Medico existe
                var medico = await _medicoService.GetMedicosByIdAsync(id);
                if (medico == null) return NoContent(); // Retorna StatusCode 204 - NoContent Caso o medico seja null

                return await _medicoService.DeleteMedico(id)
                        ? Ok(new { mensagem = "Apagado" }) // retorna um objeto para o front end (boa prática)
                        : throw new Exception("Ocorreu algum problema ao tentar apagar o Médico!");
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar medicos. Erro: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous] // Permite o acesso a quem não está com sessão iniciada no MediChat
        public async Task<IActionResult> Login(MedicoLoginDto model)
        {
            try
            {
                var medico = await _userManager.FindByEmailAsync(model.Email); // Procura na base de dados o Email
                var result = await _signInManager.CheckPasswordSignInAsync(medico, model.Password, true); // Verifica de a password corresponde

                if (result.Succeeded) // caso o resultado dê sucesso
                {
                    var appMedico = await _userManager.Users.FirstOrDefaultAsync(m => m.NormalizedEmail == model.Email.ToUpper()); //Verificamos na base de dados o email que coincida com o email indiciado
                    var medicoRetorno = _mapper.Map<MedicoLoginDto>(appMedico);

                    return Ok(new
                    {
                        token = GenerateJWToken(appMedico).Result, // gera o token - .Result é IMPORTANTE (resultado da Task)
                        medico = medicoRetorno // Atribuimos a medico todasas propriedades do medicoRetorno
                    });
                }
                return Unauthorized(); // caso os dados estejam incorretos
            }
            catch (Exception ex)
            {
                // Em caso de exception retorna status code 500 e mostra o erro
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
                    //Passam no token o ID do médico, o nome e o email
                    new Claim(ClaimTypes.NameIdentifier, medico.Id.ToString()), 
                    new Claim(ClaimTypes.Name, medico.Nome),
                    new Claim(ClaimTypes.Email, medico.Email)
                };

                var roles = await _userManager.GetRolesAsync(medico); // atribui a variavel roles todas a roles do medico

                // Percorre todas as roles 
                foreach (var role in roles) {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                // Chave (appsettings.json) com Enconding numa sequência de Bytes 
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); // Gera uma Hash Message Authentication Code (Hmac) Sha512(hash de 512 bits) com a chave

                // informações do token
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(claims), // Passa as claims ("informações" do medico na token)
                    Expires = DateTime.Now.AddHours(12), // 12 horas para a token expirar
                    SigningCredentials = creds // as credenciais (a chave)
                };

                var tokenHandler = new JwtSecurityTokenHandler(); // Para poder criar e escrever a token

                var token = tokenHandler.CreateToken(tokenDescriptor); // Cria a token com a sua descrição

                return tokenHandler.WriteToken(token); // retorna a token
            }
            catch (System.Exception)
            {
                throw; // Lança a exception
            }
        }
    }
}
