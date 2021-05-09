using System.Threading.Tasks;
using MedicChat.Application.Dtos;

namespace MedicChat.Application.Contratos
{
    public interface IPacienteService
    {
        Task<PacienteDto> AddPaciente(PacienteDto model);
        Task<PacienteDto> UpdatePaciente(int pacienteId, PacienteDto model);
        Task<bool> DeletePaciente(int pacienteId);

        Task<PacienteDto[]> GetAllPacientesAsync();
        Task<PacienteDto[]> GetAllPacientesByNomeAsync(string nome);
        Task<PacienteDto> GetPacienteByIdAsync(int pacienteId);
        Task<PacienteDto> GetPacienteByTelemovelAsync(int telemovel);
    }
}