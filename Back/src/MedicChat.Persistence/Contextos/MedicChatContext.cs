using Microsoft.EntityFrameworkCore;
using MedicChat.Domain.model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MedicChat.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace MedicChat.Persistence.Contextos
{
    public class MedicChatContext : IdentityDbContext<Medico, Role, int, 
                                                    IdentityUserClaim<int>, 
                                                    UserRole, 
                                                    IdentityUserLogin<int>, 
                                                    IdentityRoleClaim<int>, 
                                                    IdentityUserToken<int>>
    {
        public MedicChatContext(DbContextOptions<MedicChatContext> options) : base(options) { }

        public DbSet<Medico> Medicos { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<VideoChat> VideoChats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // NECESSARIO PARA O IDENTITY CORE ENTENDER
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>{

                userRole.HasKey(ur => new {ur.UserId, ur.RoleId}); // MedicoRole key tem que respeirar o novo objeto 
               
                /// POSSO TER UM PAPEL COM MAIS DE UM USUARIO
                userRole.HasOne(ur => ur.Role) // temos a entidade Role
                            .WithMany(r => r.UserRoles) // uma entidade role possui varios UserRoles
                            .HasForeignKey(ur => ur.RoleId) // possui chave estrangeira RoleId
                            .IsRequired(); //É obrigatorio

                // POSSO TER UM USUARIO COM MAIS DE UM PAPEL
                userRole.HasOne(ur => ur.Medico) // temos a entidade Medico
                            .WithMany(r => r.UserRoles) // uma entidade role possui varios UserRoles
                            .HasForeignKey(ur => ur.UserId) // possui chave estrangeira UserId
                            .IsRequired(); //É obrigatorio
            });
        }
    }
}