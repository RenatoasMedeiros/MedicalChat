using System;
using System.Threading.Tasks;
using AutoMapper;
using MedicChat.Application.Contratos;
using MedicChat.Application.Dtos;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contratos;

namespace MedicChat.Application
{
    public class VideoChatService : IVideoChatService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IVideoChatPersist _videoChatPersist;
        private readonly IMapper _mapper;
        public VideoChatService(IGeralPersist geralPersist, IVideoChatPersist videoChatPersist, IMapper mapper)
        {
            _mapper = mapper;
            _videoChatPersist = videoChatPersist;
            _geralPersist = geralPersist;

        }
        public async Task<VideoChatDto> AddVideoChat(VideoChatDto model)
        {
            try
            {
                // Map do videoChat(Dto) para videoChat(model)
                var videoChat = _mapper.Map<VideoChat>(model);

                _geralPersist.Add<VideoChat>(videoChat);
                if (await _geralPersist.SaveChangesAsync())
                {
                    // Map do videoChat(model) para videoChat(dto)
                    var videoChatRetorno = await _videoChatPersist.GetVideoChatByIdAsync(videoChat.Id);
                    return _mapper.Map<VideoChatDto>(videoChatRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<VideoChatDto> UpdateVideoChat(int videoChatId, VideoChatDto model)
        {
            try
            {
                var videoChat = await _videoChatPersist.GetVideoChatByIdAsync(videoChatId);
                if (videoChat == null) return null;

                model.Id = videoChat.Id;

                _mapper.Map(model, videoChat);

                _geralPersist.Update(videoChat);
                if (await _geralPersist.SaveChangesAsync())
                {
                    // Map do videoChat(model) para videoChat(dto)
                    var videoChatRetorno = await _videoChatPersist.GetVideoChatByIdAsync(videoChat.Id);
                    return _mapper.Map<VideoChatDto>(videoChatRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteVideoChat(int videoChatId)
        {
            try
            {
                var videoChat = await _videoChatPersist.GetVideoChatByIdAsync(videoChatId);
                if (videoChat == null) throw new Exception("Video Chat não foi encontrado.");

                _geralPersist.Delete<VideoChat>(videoChat);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VideoChatDto[]> GetAllVideoChatAsync()
        {
            try
            {
                var videoChat = await _videoChatPersist.GetAllVideoChatAsync();
                if (videoChat == null) 
                    return null;

                // Dado o Objeto medicoDto é mapeado as videoChats
                var resultado = _mapper.Map<VideoChatDto[]>(videoChat);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VideoChatDto[]> GetAllVideoChatsByPacienteIdAsync(int pacienteId)
        {
            try
            {
                var videoChats = await _videoChatPersist.GetAllVideoChatsByPacienteIdAsync(pacienteId);
                if (videoChats == null) return null;

                // Dado o Objeto VideoChatDto é mapeado os videoChats
                var resultado = _mapper.Map<VideoChatDto[]>(videoChats);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VideoChatDto> GetVideoChatByIdAsync(int videoChatId)
        {
            try
            {
                var videoChat = await _videoChatPersist.GetVideoChatByIdAsync(videoChatId);
                if (videoChat == null) return null;
                
                // Dado o Objeto medicoDto é mapeado os medicos
                var resultado = _mapper.Map<VideoChatDto>(videoChat);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}