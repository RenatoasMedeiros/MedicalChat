using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MedicChat.Application.Contratos;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contratos;

namespace MedicChat.Application
{
    public class PacienteService : IPacienteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IPacientePersist _pacientePersist;
        private readonly IMapper _mapper;
        public PacienteService(IGeralPersist geralPersist, IPacientePersist pacientePersist, IMapper mapper)
        {
            _pacientePersist = pacientePersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

        public async Task<PacienteDto> AddPaciente(PacienteDto model)
        {
            try
            {
                // Map do paciente(Dto) para paciente(model)
                var paciente = _mapper.Map<Paciente>(model);

                _geralPersist.Add<Paciente>(paciente);
                if (await _geralPersist.SaveChangesAsync())
                {
                    // Map do paciente(model) para paciente(dto)
                    var pacienteRetorno = await _pacientePersist.GetPacienteByIdAsync(paciente.Id);
                    return _mapper.Map<PacienteDto>(pacienteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PacienteDto> UpdatePaciente(int pacienteId, PacienteDto model)
        {
            try
            {
                var paciente = await _pacientePersist.GetPacienteByIdAsync(pacienteId);
                if (paciente == null) return null;

                model.Id = paciente.Id;

                _mapper.Map(model, paciente);

                _geralPersist.Update<Paciente>(paciente);
                if (await _geralPersist.SaveChangesAsync())
                {
                    // Map do paciente(model) para paciente(dto)
                    var pacienteRetorno = await _pacientePersist.GetPacienteByIdAsync(paciente.Id);
                    return _mapper.Map<PacienteDto>(pacienteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeletePaciente(int pacienteId)
        {
            try
            {
                var paciente = await _pacientePersist.GetPacienteByIdAsync(pacienteId);
                if (paciente == null) throw new Exception("Paciente não foi encontrado.");

                _geralPersist.Delete<Paciente>(paciente);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PacienteDto[]> GetAllPacientesAsync()
        {
            try
            {
                var pacientes = await _pacientePersist.GetAllPacientesAsync();
                if (pacientes == null) return null;

                // Dado o Objeto array PacienteDto é mapeado os pacientes
                var resultado = _mapper.Map<PacienteDto[]>(pacientes);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PacienteDto> GetPacienteByTelemovelAsync(int telemovel)
        {
            try
            {
                var pacientes = await _pacientePersist.GetPacienteByTelemovelAsync(telemovel);
                if (pacientes == null) return null;

                // Dado o Objeto PacienteDto é mapeado os paceintes
                var resultado = _mapper.Map<PacienteDto>(pacientes);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PacienteDto[]> GetAllPacientesByNomeAsync(string nome)
        {
            try
            {
                var pacientes = await _pacientePersist.GetAllPacientesByNomeAsync(nome);
                if (pacientes == null) return null;

                // Dado o Objeto PacienteDto é mapeado os paceintes
                var resultado = _mapper.Map<PacienteDto[]>(pacientes);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PacienteDto> GetPacienteByIdAsync(int PacienteId)
        {
            try
            {
                var pacientes = await _pacientePersist.GetPacienteByIdAsync(PacienteId);
                if (pacientes == null) return null;

                // Dado o Objeto PacienteDto é mapeado os paceintes
                var resultado = _mapper.Map<PacienteDto>(pacientes);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}