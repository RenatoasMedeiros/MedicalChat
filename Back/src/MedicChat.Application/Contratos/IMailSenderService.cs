using System;
using System.Collections.Generic;

namespace MedicChat.Application.Contratos
{
    public interface IMailSenderService
    {
        void SendPlaintextGmail(string recipientEmail, string recipientName, DateTime videochatDate);
        void SendHtmlGmail(string recipientEmail, string recipientName);
        void SendHtmlWithAttachmenttextGmail(string recipientEmail, string recipientName);

        void SendPlaintextSendgrid(string recipientEmail, string recipientName);
        void SendHtmlSendgrid(string recipientEmail, string recipientName);
        void SendHtmlWithAttachmentSendgrid(string recipientEmail, string recipientName);
        void SendSendgridBulk(IEnumerable<string> recipientEmails);
    }
}