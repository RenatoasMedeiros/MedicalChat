using System.Threading.Tasks;
using MedicChat.Domain;

namespace MedicChat.Application.Contratos
{
    public interface IMedicoService
    {
         Task<Medico> AddMedico(Medico model);
         Task<Medico> UpdateMedico(int medicoId, Medico model);
         Task<bool> DeleteMedico(int medicoId);

         Task<Medico[]> GetAllMedicosAsync();
        Task<Medico[]> GetAllMedicosByNomeAsync(string nome);
        Task<Medico[]> GetAllMedicosByEspecialidadeAsync(string especialidade);
        Task<Medico> GetMedicosByIdAsync(int medicoId);
    }
}