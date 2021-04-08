using System;
using MedicChat.Domain.model.Enums;

namespace MedicChat.Domain.model
{
    public class VideoChat
    {
        public int Id { get; set; }
        public string Relatorio { get; set; }
        public string Token { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public VideoChatStatus EstadoVideoChat { get; set; }

        // Propriedade de Navegação!
        public int MedicoID { get; set; }
        public Medico Medico { get; set; }
        public int PacienteID { get; set; }
        public Paciente Paciente { get; set; }
    }
}