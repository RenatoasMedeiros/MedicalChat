using System.Threading.Tasks;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;

namespace MedicChat.Application.Contratos
{
    public interface IVideoChatService
    {
        Task<VideoChatDto> AddVideoChat(VideoChatDto model);
        Task<VideoChatDto> UpdateVideoChat(int videoChatId, VideoChatDto model);
        Task<bool> DeleteVideoChat(int videoChatId);

        Task<VideoChatDto[]> GetAllVideoChatAsync();
        Task<VideoChatDto[]> GetAllVideoChatByNomeMedicoAsync(string nomeMedico);
        Task<VideoChatDto[]> GetAllVideoChatByNomePacienteAsync(string nomePaciente);
        Task<VideoChatDto> GetVideoChatByIdAsync(int videoChatId);
    }
}