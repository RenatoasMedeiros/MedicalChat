import { AgendaInformacaoComponent } from './components/agenda/agenda-informacao/agenda-informacao.component';
import { AgendaListaComponent } from './components/agenda/agenda-lista/agenda-lista.component';
import { MedicoInformacaoComponent } from './components/medicos/medico-informacao/medico-informacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RegistarMedicoComponent } from './components/user/registar-medico/registar-medico.component';
import { PerfilMedicoComponent } from './components/user/perfil-medico/perfil-medico.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AgendaComponent } from './components/agenda/agenda.component';

import { MedicosComponent } from './components/medicos/medicos.component';
import { MedicoListaComponent } from './components/medicos/medico-lista/medico-lista.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteInformacaoComponent } from './components/pacientes/paciente-informacao/paciente-informacao.component';
import { PacienteListaComponent } from './components/pacientes/paciente-lista/paciente-lista.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registar-medico', component: RegistarMedicoComponent },
    ]
  },
  {
    path: 'user/perfil-medico', component: PerfilMedicoComponent
  },
  { path: 'pacientes', redirectTo: 'pacientes/lista' },
  {
    path: 'pacientes', component: PacientesComponent,
    children: [
      { path: 'informacao/:id', component: PacienteInformacaoComponent },
      { path: 'informacao', component: PacienteInformacaoComponent },
      { path: 'lista', component: PacienteListaComponent },
    ]

  },
  { path: 'medicos', redirectTo: 'medicos/lista' },
  {
    path: 'medicos', component: MedicosComponent,
    children: [
      { path: 'informacao/:id', component: MedicoInformacaoComponent },
      { path: 'informacao', component: MedicoInformacaoComponent },
      { path: 'lista', component: MedicoListaComponent },
    ]
  },
  { path: 'agenda', redirectTo: 'agenda/lista' },
  {
    path: 'agenda', component: AgendaComponent,
    children: [
      { path: 'informacao/:id', component: AgendaInformacaoComponent },
      { path: 'informacao', component: AgendaInformacaoComponent },
      { path: 'lista', component: AgendaListaComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
