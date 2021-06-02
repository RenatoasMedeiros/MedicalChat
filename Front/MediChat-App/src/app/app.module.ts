import { AuthInterceptor } from './auth/auth.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
// CONFIGURAÇÕES DO DATEPICKER
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// SERVICES
import { PacienteService } from './services/paciente.service';
import { MedicoService } from './services/medico.service';
import { VideoChatService } from './services/videoChat.service';

// HELPERS
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { DatePlusHourFormatPipe } from './helpers/DatePlusHourFormat.pipe';

// COMPONENTS
import { AgendaCriarComponent } from './components/agenda/agenda-criar/agenda-criar.component';
import { AgendaListaComponent } from './components/agenda/agenda-lista/agenda-lista.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { VideoChatPlayerComponent } from './components/videoChat/videoChat-player/videoChat-player.component';
import { VideoChatComponent } from './components/videoChat/videoChat.component';

import { MedicoListaComponent } from './components/medicos/medico-lista/medico-lista.component';
import { MedicosComponent } from './components/medicos/medicos.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteListaComponent } from './components/pacientes/paciente-lista/paciente-lista.component';
import { PacienteInformacaoComponent } from './components/pacientes/paciente-informacao/paciente-informacao.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistarMedicoComponent } from './components/user/registar-medico/registar-medico.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

// COMPONENTES PARTILHADOS
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { WebSocketService } from './services/web-socket.service';
import { PeerService } from './services/peer.service';

// socket io na porta 3000
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {withCredentials: '*'}}; // Sem credenciais


defineLocale('pt', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    PacientesComponent,
    PacienteInformacaoComponent,
    AgendaComponent,
    DashboardComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipe,
    DatePlusHourFormatPipe,
    PacienteListaComponent,
    MedicoListaComponent,
    UserComponent,
    LoginComponent,
    RegistarMedicoComponent,
    AgendaListaComponent,
    AgendaCriarComponent,
    VideoChatComponent,
    VideoChatPlayerComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    ClipboardModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [PacienteService, MedicoService, VideoChatService, WebSocketService, PeerService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }], //multi para tratar de multiplas requisições
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
