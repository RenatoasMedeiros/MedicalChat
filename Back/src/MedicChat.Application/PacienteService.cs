using System;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Domain;
using MedicChat.Persistence.Contratos;

namespace MedicChat.Application
{
    public class PacienteService : IPacienteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IPacientePersist _pacientePersist;
        public PacienteService(IGeralPersist geralPersist, IPacientePersist pacientePersist)
        {
            _pacientePersist = pacientePersist;
            _geralPersist = geralPersist;
        }

        public async Task<Paciente> AddPaciente(Paciente model)
        {
            try
            {
                _geralPersist.Add<Paciente>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _pacientePersist.GetPacienteByIdAsync(model.Id);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Paciente> UpdatePaciente(int pacienteId, Paciente model)
        {
            try
            {
                var paciente = await _pacientePersist.GetPacienteByIdAsync(pacienteId);
                if (paciente == null) return null;

                model.Id = paciente.Id;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _pacientePersist.GetPacienteByIdAsync(model.Id);
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

        public async Task<Paciente[]> GetAllPacientesAsync()
        {
            try
            {
                var pacientes = await _pacientePersist.GetAllPacientesAsync();
                if(pacientes == null) return null;
                return pacientes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Paciente> GetPacienteByTelemovelAsync(int telemovel)
        {
            try
            {
                var pacientes = await _pacientePersist.GetPacienteByTelemovelAsync(telemovel);
                if(pacientes == null) return null;
                return pacientes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Paciente[]> GetAllPacientesByNomeAsync(string nome)
        {
            try
            {
                var pacientes = await _pacientePersist.GetAllPacientesByNomeAsync(nome);
                if(pacientes == null) return null;
                return pacientes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Paciente> GetPacienteByIdAsync(int PacienteId)
        {
            try
            {
                var pacientes = await _pacientePersist.GetPacienteByIdAsync(PacienteId);
                if(pacientes == null) return null;
                return pacientes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}