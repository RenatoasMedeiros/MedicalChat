using System.Linq;
using System.Threading.Tasks;
using MedicChat.Domain;
using MedicChat.Persistence.Contratos;
using MedicChat.Persistence.Contextos;
using Microsoft.EntityFrameworkCore;

namespace MedicChat.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly MedicChatContext _context;
        public GeralPersist (MedicChatContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            _context.RemoveRange(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}