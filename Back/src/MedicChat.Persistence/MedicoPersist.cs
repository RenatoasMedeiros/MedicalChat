using System.Linq;
using System.Threading.Tasks;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contratos;
using MedicChat.Persistence.Contextos;
using Microsoft.EntityFrameworkCore;

namespace MedicChat.Persistence
{
    public class MedicoPersist : IMedicoPersist
    {
        private readonly MedicChatContext _context;
        public MedicoPersist(MedicChatContext context)
        {
            _context = context;
        }
        public async Task<Medico[]> GetAllMedicosAsync()
        {
            IQueryable<Medico> query = _context.Medicos
                .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(m => m.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Medico[]> GetAllMedicosByEspecialidadeAsync(string especialidade)
        {
            IQueryable<Medico> query = _context.Medicos
                .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.Especialidade.ToLower().Contains(especialidade.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Medico[]> GetAllMedicosByNomeAsync(string nome)
        {
            IQueryable<Medico> query = _context.Medicos
                .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.UserName.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Medico> GetMedicosByIdAsync(int medicoId)
        {
            IQueryable<Medico> query = _context.Medicos
                .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.Id == medicoId);

            return await query.FirstOrDefaultAsync();
        }
    }
}