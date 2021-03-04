using System.Threading.Tasks;
using MedicChat.Domain;

namespace MedicChat.Persistence.Contratos
{
    public interface IPacientePersist
    {
        // PACIENTES
        Task<Paciente[]> GetAllPacientesAsync();
        Task<Paciente[]> GetAllPacientesByNomeAsync(string nome);
        Task<Paciente> GetPacientesByIdAsync(int pacienteId);
        Task<Paciente> GetPacientesByTelemovelAsync(int telemovel);
    }
}