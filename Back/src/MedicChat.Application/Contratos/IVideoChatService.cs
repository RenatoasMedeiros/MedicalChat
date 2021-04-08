using System.Threading.Tasks;
using MedicChat.Domain.model;

namespace MedicChat.Application.Contratos
{
    public interface IVideoChatService
    {
        Task<VideoChat> AddVideoChat(VideoChat model);
        Task<VideoChat> UpdateVideoChat(int videoChatId, VideoChat model);
        Task<bool> DeleteVideoChat(int videoChatId);

        Task<VideoChat[]> GetAllVideoChatAsync();
        Task<VideoChat[]> GetAllVideoChatByNomeMedicoAsync(string nomeMedico);
        Task<VideoChat[]> GetAllVideoChatByNomePacienteAsync(string nomePaciente);
        Task<VideoChat> GetVideoChatByIdAsync(int videoChatId);
    }
}