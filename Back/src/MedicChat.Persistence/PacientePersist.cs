using System.Linq;
using System.Threading.Tasks;
using MedicChat.Domain;
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

            query = query.OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Paciente[]> GetAllPacientesByNomeAsync(string nome)
        {
            IQueryable<Paciente> query = _context.Pacientes;

            query = query.OrderBy(p => p.Id).Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }


        public async Task<Paciente> GetPacientesByIdAsync(int pacienteId)
        {
            IQueryable<Paciente> query = _context.Pacientes;

            query = query.OrderBy(p => p.Id).Where(p => p.Id == pacienteId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Paciente> GetPacientesByTelemovelAsync(int telemovel)
        {
            IQueryable<Paciente> query = _context.Pacientes;

            query = query.OrderBy(p => p.Id).Where(p => p.Telemovel == telemovel);

            return await query.FirstOrDefaultAsync();
        }

    }
}