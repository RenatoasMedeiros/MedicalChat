using Microsoft.EntityFrameworkCore;
using MedicChat.Domain;

namespace MedicChat.Persistence.Contextos
{
    public class MedicChatContext : DbContext
    {
        public MedicChatContext(DbContextOptions<MedicChatContext> options) : base(options) { }

        public DbSet<Medico> Medicos { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<VideoChat> VideoChats { get; set; }
    }
}