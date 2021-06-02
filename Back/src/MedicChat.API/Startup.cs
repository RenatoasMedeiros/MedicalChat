using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MedicChat.Persistence.Contextos;
using MedicChat.Application.Contratos;
using MedicChat.Application;
using MedicChat.Persistence.Contratos;
using MedicChat.Persistence;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Identity;
using MedicChat.Domain.Identity;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MedicChat.Domain.model;

namespace MedicChat.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MedicChatContext>( 
                context => context.UseSqlServer(Configuration.GetConnectionString("DefaultPortatil"))
            );

            // builder receber do service um user
            IdentityBuilder builder = services.AddIdentityCore<Medico>(options => {
                options.Password.RequiredLength = 8;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);

            builder.AddEntityFrameworkStores<MedicChatContext>(); // Levar em consideração o contexto para trabalhar com o resto
            builder.AddRoleValidator<RoleValidator<Role>>(); // RoleValidator -> Dominio Role
            builder.AddRoleManager<RoleManager<Role>>(); // RoleManager -> Dominio Role
            builder.AddSignInManager<SignInManager<Medico>>(); // // SignInManager -> Dominio Medico

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(x =>
                    {
                        x.RequireHttpsMetadata = false;
                        x.SaveToken = true;
                        x.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true, // Validação pela assinatura da chave do emissor
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)), // Key que está a ser validada
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });

            services.AddControllers()
                    .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            // Declaração do automapper (Dentro do domino da aplicação procurra os Assemblies que referenciem o AutoMapper)
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());            

            // Declaração de todos os Escopos da aplicação 
            services.AddScoped<IGeralPersist, GeralPersist>();
            services.AddScoped<IMedicoService, MedicoService>();
            services.AddScoped<IMedicoPersist, MedicoPersist>();
            services.AddScoped<IPacienteService, PacienteService>();
            services.AddScoped<IPacientePersist, PacientePersist>();
            services.AddScoped<IVideoChatService, VideoChatService>();
            services.AddScoped<IVideoChatPersist, VideoChatPersist>();
            services.AddScoped<IMailSenderService, MailSenderService>();

            var from = Configuration.GetSection("Mail")["From"];
            var gmailSender = Configuration.GetSection("Gmail")["Sender"];
            var gmailPassword = Configuration.GetSection("Gmail")["Password"];

            services.AddFluentEmail(gmailSender, from).AddSmtpSender(new SmtpClient("smtp.gmail.com") {
                UseDefaultCredentials = false,
                //Porta para o Gmail
                Port = 587,
                //Credenciais do Email de Envio
                Credentials = new NetworkCredential(gmailSender,gmailPassword),
                EnableSsl = true,
            });


            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MedicChat.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MedicChat.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowAnyOrigin());

            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireAuthorization();
            });
        }
    }
}
