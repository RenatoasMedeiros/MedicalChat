using System.Threading.Tasks;
using MedicChat.Domain.model;

namespace MedicChat.Persistence.Contratos
{
    public interface IVideoChatPersist
    {
        Task<VideoChat[]> GetAllVideoChatAsync();
        Task<VideoChat[]> GetAllVideoChatByNomeMedicoAsync(string nomeMedico);
        Task<VideoChat[]> GetAllVideoChatByNomePacienteAsync(string nomePaciente);
        Task<VideoChat> GetVideoChatByIdAsync(int videoChatId);
    }
}