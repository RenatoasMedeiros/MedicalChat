using System.Threading.Tasks;
using MedicChat.Domain.model;

namespace MedicChat.Persistence.Contratos
{
    public interface IPacientePersist
    {
        // PACIENTES
        Task<Paciente[]> GetAllPacientesAsync();
        Task<Paciente[]> GetAllPacientesByNomeAsync(string nome);
        Task<Paciente> GetPacienteByIdAsync(int pacienteId);
        Task<Paciente> GetPacienteByTelemovelAsync(int telemovel);
    }
}