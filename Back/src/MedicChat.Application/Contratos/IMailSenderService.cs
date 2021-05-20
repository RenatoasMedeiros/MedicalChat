using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MedicChat.Application.Contratos
{
    public interface IMailSenderService
    {
        void SendPlaintextGmail(string recipientEmail, string recipientName, string videochatDateInicio);
        void SendHtmlGmail(string recipientEmail, string recipientName);
    }
}