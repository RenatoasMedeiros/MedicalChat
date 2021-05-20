using System;
using System.Collections.Generic;
using MedicChat.Application.Contratos;
using Microsoft.Extensions.DependencyInjection;
using FluentEmail.Core;

namespace MedicChat.Application
{
    public class MailSenderService : IMailSenderService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IVideoChatService _videoChatService;

        public MailSenderService(IServiceProvider serviceProvider, IVideoChatService videoChatService)
        {
            _serviceProvider = serviceProvider;
            _videoChatService = videoChatService;
        }
        public void SendHtmlGmail(string recipientEmail, string recipientName)
        {
            throw new System.NotImplementedException();
        }

        public async void SendPlaintextGmail(string recipientEmail, string recipientName, DateTime videochatDate)
        {
            try {
                using (var scope = _serviceProvider.CreateScope()) {
                    var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
                    var email = mailer
                        .To(recipientEmail, recipientName)
                        .Subject("MediChat " + recipientName + " - Consulta Agendada")
                        .Body("A sua consulta foi agendada no dia " + videochatDate);
                        await email.SendAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // public async void SendPlaintextGmail(string recipientEmail, string recipientName, DateTime videochatDate)
        // {
        //     try {
        //         using (var scope = _serviceProvider.CreateScope()) {
        //             var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
        //             var email = mailer
        //                 .To(recipientEmail, recipientName)
        //                 .Subject("MediChat " + recipientName + " - Consulta Agendada")
        //                 .Body("A sua consulta foi agendada no dia " + videochatDate.Day + "/" 
        //                                                             + videochatDate.Month + "/" 
        //                                                             + videochatDate.Year + " às " 
        //                                                             + videochatDate.Hour + ":" 
        //                                                             + videochatDate.Minute + "."
        //                 );
        //                 await email.SendAsync();
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }
   }
}