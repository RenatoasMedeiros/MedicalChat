using System.Threading.Tasks;
using MedicChat.Domain.model;

namespace MedicChat.Persistence.Contratos
{
    public interface IVideoChatPersist
    {
        Task<VideoChat[]> GetAllVideoChatAsync();
        Task<VideoChat[]> GetAllVideoChatsByPacienteIdAsync(int pacienteId);
        Task<VideoChat[]> GetAllVideoChatsByMedicoIdAsync(int medicoId);
        Task<VideoChat> GetVideoChatByIdAsync(int videoChatId);
    }
}