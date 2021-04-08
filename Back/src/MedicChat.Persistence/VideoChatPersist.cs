using System.Linq;
using System.Threading.Tasks;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contextos;
using MedicChat.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace MedicChat.Persistence
{
    public class VideoChatPersist : IVideoChatPersist
    {
        private readonly MedicChatContext _context;

        public VideoChatPersist(MedicChatContext context)
        {
            _context = context;
        }
        public async Task<VideoChat[]> GetAllVideoChatAsync()
        {
            IQueryable<VideoChat> query = _context.VideoChats
                .Include(m => m.Medico)
                .Include(p => p.Paciente);

            query = query.AsNoTracking().OrderBy(m => m.Id);

            return await query.ToArrayAsync();
        }

        public async Task<VideoChat[]> GetAllVideoChatByNomeMedicoAsync(string nomeMedico)
        {
            IQueryable<VideoChat> query = _context.VideoChats
                .Include(m => m.Medico)
                .Include(p => p.Paciente);

            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.Medico.Nome.ToLower().Contains(nomeMedico.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<VideoChat[]> GetAllVideoChatByNomePacienteAsync(string nomePaciente)
        {
            IQueryable<VideoChat> query = _context.VideoChats
                .Include(m => m.Medico)
                .Include(p => p.Paciente);

            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.Paciente.Nome.ToLower().Contains(nomePaciente.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<VideoChat> GetVideoChatByIdAsync(int videoChatId)
        {
            IQueryable<VideoChat> query = _context.VideoChats
                .Include(m => m.Medico)
                .Include(p => p.Paciente);


            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.Id == videoChatId);

            return await query.FirstOrDefaultAsync();
        }
    }
}