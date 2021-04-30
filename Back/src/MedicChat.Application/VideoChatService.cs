using System;
using System.Threading.Tasks;
using MedicChat.Application.Contratos;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contratos;

namespace MedicChat.Application
{
    public class VideoChatService : IVideoChatService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IVideoChatPersist _videoChatPersist;
        public VideoChatService(IGeralPersist geralPersist, IVideoChatPersist videoChatPersist)
        {
            _videoChatPersist = videoChatPersist;
            _geralPersist = geralPersist;

        }
        public async Task<VideoChat> AddVideoChat(VideoChat model)
        {
            try
            {
                _geralPersist.Add<VideoChat>(model);
                if (await _geralPersist.SaveChangesAsync())
                    return await _videoChatPersist.GetVideoChatByIdAsync(model.Id);
                    
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<VideoChat> UpdateVideoChat(int videoChatId, VideoChat model)
        {
            try
            {
                var VideoChat = await _videoChatPersist.GetVideoChatByIdAsync(videoChatId);
                if (VideoChat == null) return null;

                model.Id = VideoChat.Id;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _videoChatPersist.GetVideoChatByIdAsync(model.Id);
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

        public async Task<VideoChat[]> GetAllVideoChatAsync()
        {
            try
            {
                var videoChat = await _videoChatPersist.GetAllVideoChatAsync();
                if(videoChat == null) return null;
                return videoChat;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            } 
        }

        public async Task<VideoChat[]> GetAllVideoChatByNomeMedicoAsync(string nomeMedico)
        {
            try
            {
                var videoChat = await _videoChatPersist.GetAllVideoChatByNomeMedicoAsync(nomeMedico);
                if(videoChat == null) return null;
                return videoChat;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VideoChat[]> GetAllVideoChatByNomePacienteAsync(string nomePaciente)
        {
            try
            {
                var videoChat = await _videoChatPersist.GetAllVideoChatByNomePacienteAsync(nomePaciente);
                if(videoChat == null) return null;
                return videoChat;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VideoChat> GetVideoChatByIdAsync(int videoChatId)
        {
            try
            {
                var videoChat = await _videoChatPersist.GetVideoChatByIdAsync(videoChatId);
                if(videoChat == null) return null;
                return videoChat;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}