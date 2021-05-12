using System;
using System.Collections.Generic;

namespace MedicChat.Application.Contratos
{
    public interface IMailSenderService
    {
        void SendPlaintextGmail(string recipientEmail, string recipientName, DateTime videochatDateInicio);
        void SendHtmlGmail(string recipientEmail, string recipientName);
    }
}