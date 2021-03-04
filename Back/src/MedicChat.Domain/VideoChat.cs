using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicChat.Domain
{
    public class VideoChat
    {
        public int Id { get; set; }
        public string Relatorio { get; set; }
        public string Token { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }

        [ForeignKey("Medico")]
        public int MedicoId { get; set; }
        public Medico Medico { get; set; }

        [ForeignKey("Paciente")]
        public int PacienteId { get; set; }
        public Paciente Paciente { get; set; }
    }
}