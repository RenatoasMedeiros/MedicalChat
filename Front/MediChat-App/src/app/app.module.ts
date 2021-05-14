import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
import { AgendaInformacaoVisualizarComponent } from './components/agenda/agenda-informacao-visualizar/agenda-informacao-visualizar.component';
import { AgendaListaComponent } from './components/agenda/agenda-lista/agenda-lista.component';
import { AgendaComponent } from './components/agenda/agenda.component';

import { MedicoInformacaoComponent } from './components/medicos/medico-informacao/medico-informacao.component';
import { MedicoListaComponent } from './components/medicos/medico-lista/medico-lista.component';
import { MedicosComponent } from './components/medicos/medicos.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteListaComponent } from './components/pacientes/paciente-lista/paciente-lista.component';
import { PacienteInformacaoComponent } from './components/pacientes/paciente-informacao/paciente-informacao.component';

import { PerfilMedicoComponent } from './components/user/perfil-medico/perfil-medico.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistarMedicoComponent } from './components/user/registar-medico/registar-medico.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

// COMPONENTES PARTILHADOS
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    PacientesComponent,
    PacienteInformacaoComponent,
    AgendaComponent,
    DashboardComponent,
    PerfilMedicoComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipe,
    DatePlusHourFormatPipe,
    PacienteListaComponent,
    MedicoListaComponent,
    MedicoInformacaoComponent,
    UserComponent,
    LoginComponent,
    RegistarMedicoComponent,
    AgendaListaComponent,
    AgendaInformacaoVisualizarComponent,
    AgendaCriarComponent
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
  ],
  providers: [PacienteService, MedicoService, VideoChatService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
