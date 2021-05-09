using AutoMapper;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;

namespace MedicChat.Application.Helpers
{
    public class MedicChatProfile : Profile
    {
        public MedicChatProfile()
        {
            // Paciente -> PacienteDto (Criação do Map)
            CreateMap<Paciente, PacienteDto>().ReverseMap();
            // Medico -> MedicoDto (Criação do Map)
            CreateMap<Medico, MedicoDto>().ReverseMap();
            // VideoChat -> VideoChatDto (Criação do Map)
            CreateMap<VideoChat, VideoChatDto>().ReverseMap();
        }
    }
}