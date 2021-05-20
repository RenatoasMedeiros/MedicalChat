using System;
using System.ComponentModel.DataAnnotations;
using MedicChat.Domain.model;
using MedicChat.Domain.model.Enums;

namespace MedicChat.Application.Dtos
{
    public class VideoChatDto
    {
        public int Id { get; set; }
        public string Relatorio { get; set; }
        public string Token { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public string DataInicio { get; set; }
        public string DataFim { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public VideoChatStatus EstadoVideoChat { get; set; }

        // Propriedade de Navegação!
        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public int MedicoID { get; set; }
        public Medico Medico { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatorio")]
        public int PacienteID { get; set; }
        
        public Paciente Paciente { get; set; }
    }
}