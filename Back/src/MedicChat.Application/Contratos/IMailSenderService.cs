using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MedicChat.Application.Contratos
{
    public interface IMailSenderService
    {
        void EnviarGmailConsultaAgendada(string recipientEmail, string recipientName, DateTime videochatDateInicio);
        void EnviarGmailConsultaIniciada(string recipientEmail, string recipientName, string token, int idConsulta);
    }
}