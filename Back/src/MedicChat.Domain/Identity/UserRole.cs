using MedicChat.Domain.model;
using Microsoft.AspNetCore.Identity;

namespace MedicChat.Domain.Identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public Medico Medico { get; set; }
        public Role Role { get; set; }
    }
}