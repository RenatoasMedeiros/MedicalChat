using System.Threading.Tasks;
using MedicChat.Domain;

namespace MedicChat.Persistence.Contratos
{
    public interface IMedicoPersist 
    {
        // MEDICOS
        Task<Medico[]> GetAllMedicosAsync();
        Task<Medico[]> GetAllMedicosByNomeAsync(string nome);
        Task<Medico[]> GetAllMedicosByEspecialidadeAsync(string especialidade);
        Task<Medico> GetMedicosByIdAsync(int medicoId);
    }
}