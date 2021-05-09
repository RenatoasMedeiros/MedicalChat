using System.Threading.Tasks;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;

namespace MedicChat.Application.Contratos
{
    public interface IMedicoService
    {
        Task<MedicoDto> AddMedico(MedicoDto model);
        Task<MedicoDto> UpdateMedico(int medicoId, MedicoDto model);
        Task<bool> DeleteMedico(int medicoId);

        Task<MedicoDto[]> GetAllMedicosAsync();
        Task<MedicoDto[]> GetAllMedicosByNomeAsync(string nome);
        Task<MedicoDto[]> GetAllMedicosByEspecialidadeAsync(string especialidade);
        Task<MedicoDto> GetMedicosByIdAsync(int medicoId);
    }
}