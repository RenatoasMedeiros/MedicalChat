using System.Threading.Tasks;
using MedicChat.Domain;

namespace MedicChat.Application.Contratos
{
    public interface IPacienteService
    {
        Task<Paciente> AddPaciente(Paciente model);
        Task<Paciente> UpdatePaciente(int pacienteId, Paciente model);
        Task<bool> DeletePaciente(int pacienteId);

        Task<Paciente[]> GetAllPacientesAsync();
        Task<Paciente[]> GetAllPacientesByNomeAsync(string nome);
        Task<Paciente> GetPacienteByIdAsync(int pacienteId);
        Task<Paciente> GetPacienteByTelemovelAsync(int telemovel);
    }
}