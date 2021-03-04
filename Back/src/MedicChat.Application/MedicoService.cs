using System;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Domain;
using MedicChat.Persistence.Contratos;

namespace MedicChat.Application
{
    public class MedicoService : IMedicoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IMedicoPersist _medicoPersist;
        public MedicoService(IGeralPersist geralPersist, IMedicoPersist medicoPersist)
        {
            _medicoPersist = medicoPersist;
            _geralPersist = geralPersist;

        }

        public async Task<Medico> AddMedico(Medico model)
        {
            try
            {
                _geralPersist.Add<Medico>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _medicoPersist.GetMedicosByIdAsync(model.Id);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Medico> UpdateMedico(int medicoId, Medico model)
        {
            try
            {
                var medico = await _medicoPersist.GetMedicosByIdAsync(medicoId);
                if (medico == null) return null;

                model.Id = medico.Id;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _medicoPersist.GetMedicosByIdAsync(model.Id);
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

        public Task<Medico[]> GetAllMedicosAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<Medico[]> GetAllMedicosByEspecialidadeAsync(string especialidade)
        {
            throw new System.NotImplementedException();
        }

        public Task<Medico[]> GetAllMedicosByNomeAsync(string nome)
        {
            throw new System.NotImplementedException();
        }

        public Task<Medico> GetMedicosByIdAsync(int medicoId)
        {
            throw new System.NotImplementedException();
        }

    }
}