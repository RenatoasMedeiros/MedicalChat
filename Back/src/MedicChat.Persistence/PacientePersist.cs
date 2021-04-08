using System.Linq;
using System.Threading.Tasks;
using MedicChat.Domain.model;
using MedicChat.Persistence.Contratos;
using MedicChat.Persistence.Contextos;
using Microsoft.EntityFrameworkCore;

namespace MedicChat.Persistence
{
    public class PacientePersist : IPacientePersist
    {
        private readonly MedicChatContext _context;
        public PacientePersist(MedicChatContext context)
        {
            _context = context;

        }
        public async Task<Paciente[]> GetAllPacientesAsync()
        {
            IQueryable<Paciente> query = _context.Pacientes;
                // .Include(m => m.VideoChats);


            query = query.AsNoTracking().OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Paciente[]> GetAllPacientesByNomeAsync(string nome)
        {
            IQueryable<Paciente> query = _context.Pacientes;
                // .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }


        public async Task<Paciente> GetPacienteByIdAsync(int pacienteId)
        {
            IQueryable<Paciente> query = _context.Pacientes;
                // .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Id == pacienteId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Paciente> GetPacienteByTelemovelAsync(int telemovel)
        {
            IQueryable<Paciente> query = _context.Pacientes;
                // .Include(m => m.VideoChats);

            query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Telemovel == telemovel);

            return await query.FirstOrDefaultAsync();
        }
    }
}