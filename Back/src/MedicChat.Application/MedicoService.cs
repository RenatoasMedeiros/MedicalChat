using System;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MedicChat.Application.Contratos;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contratos;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace MedicChat.Application
{
    public class MedicoService : IMedicoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IMedicoPersist _medicoPersist;
        private readonly IMapper _mapper;
        private readonly UserManager<Medico> _userManager;
        private readonly IConfiguration _configuration;
        public MedicoService(IGeralPersist geralPersist, IMedicoPersist medicoPersist, IMapper mapper, IConfiguration configuration, UserManager<Medico> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _medicoPersist = medicoPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

        public async Task<MedicoDto> AddMedico(MedicoDto model)
        {
            try
            {
                // Map do medico(Dto) para medico(model)
                var medico = _mapper.Map<Medico>(model);

                var result = await _userManager.CreateAsync(medico, model.Password);

                if (result.Succeeded) {
                    _geralPersist.Add<Medico>(medico);
                    if (await _geralPersist.SaveChangesAsync())
                    {
                        // Map do medico(model) para medico(dto)
                        var medicoRetorno = await _medicoPersist.GetMedicosByIdAsync(medico.Id);
                        return _mapper.Map<MedicoDto>(medicoRetorno);
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MedicoDto> UpdateMedico(int medicoId, MedicoDto model)
        {
            try
            {
                var medico = await _medicoPersist.GetMedicosByIdAsync(medicoId);
                if (medico == null) return null;

                model.Id = medico.Id;

                _mapper.Map(model, medico);

                _geralPersist.Update(medico);
                if (await _geralPersist.SaveChangesAsync())
                {
                    // Map do medico(model) para medico(dto)
                    var medicoRetorno = await _medicoPersist.GetMedicosByIdAsync(medico.Id);
                    return _mapper.Map<MedicoDto>(medicoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteMedico(int medicoId)
        {
            try
            {
                var medico = await _medicoPersist.GetMedicosByIdAsync(medicoId);
                if (medico == null) throw new Exception("Medico não foi encontrado.");

                _geralPersist.Delete<Medico>(medico);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MedicoDto[]> GetAllMedicosAsync()
        {
            try
            {
                var medicos = await _medicoPersist.GetAllMedicosAsync();
                if (medicos == null) return null;

                // Dado o Objeto medicoDto é mapeado os medicos
                var resultado = _mapper.Map<MedicoDto[]>(medicos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MedicoDto[]> GetAllMedicosByEspecialidadeAsync(string especialidade)
        {
            try
            {
                var medicos = await _medicoPersist.GetAllMedicosByEspecialidadeAsync(especialidade);
                if (medicos == null) return null;

                // Dado o Objeto medicoDto é mapeado os medicos
                var resultado = _mapper.Map<MedicoDto[]>(medicos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MedicoDto[]> GetAllMedicosByNomeAsync(string nome)
        {
            try
            {
                var medicos = await _medicoPersist.GetAllMedicosByNomeAsync(nome);
                if (medicos == null) return null;

                // Dado o Objeto medicoDto é mapeado os medicos
                var resultado = _mapper.Map<MedicoDto[]>(medicos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MedicoDto> GetMedicosByIdAsync(int medicoId)
        {
            try
            {
                var medicos = await _medicoPersist.GetMedicosByIdAsync(medicoId);
                if (medicos == null) return null;

                // Dado o Objeto medicoDto é mapeado os medicos
                var resultado = _mapper.Map<MedicoDto>(medicos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}