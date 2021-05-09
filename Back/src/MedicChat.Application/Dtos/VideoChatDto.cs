using System;
using MedicChat.Domain.model;

namespace MedicChat.Application.Dtos
{
    public class VideoChatDto
    {
        public int Id { get; set; }
        public string Relatorio { get; set; }
        public string Token { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string EstadoVideoChat { get; set; }

        // Propriedade de Navegação!
        public int MedicoID { get; set; }
        // public Medico Medico { get; set; }
        public int PacienteID { get; set; }
        public Paciente Paciente { get; set; }
    }
}