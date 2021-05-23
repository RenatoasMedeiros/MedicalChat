using System;
using System.Collections.Generic;
using MedicChat.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace MedicChat.Domain.model
{
    public class Medico : IdentityUser<int> // O médico é um usuario para login, logo herda as propriedades de IdentityUser
    {
        public int Telemovel { get; set; }
        public string Foto { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Genero { get; set; }
        public string Especialidade { get; set; }
        public string Descricao { get; set; }
        public string Endereco { get; set; }
        public string CodPostal { get; set; }
        
        public List<UserRole> UserRoles { get; set; }

        // Propriedade de Navegação!
        public IEnumerable<VideoChat> VideoChats { get; set; }

    }
}