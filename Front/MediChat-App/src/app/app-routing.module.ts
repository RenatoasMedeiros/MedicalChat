import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RegistarMedicoComponent } from './components/user/registar-medico/registar-medico.component';
import { PerfilMedicoComponent } from './components/user/perfil-medico/perfil-medico.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendaListaComponent } from './components/agenda/agenda-lista/agenda-lista.component';
import { AgendaInformacaoVisualizarComponent } from './components/agenda/agenda-informacao-visualizar/agenda-informacao-visualizar.component';

import { MedicosComponent } from './components/medicos/medicos.component';
import { MedicoListaComponent } from './components/medicos/medico-lista/medico-lista.component';
import { MedicoInformacaoComponent } from './components/medicos/medico-informacao/medico-informacao.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteInformacaoComponent } from './components/pacientes/paciente-informacao/paciente-informacao.component';
import { PacienteListaComponent } from './components/pacientes/paciente-lista/paciente-lista.component';
import { AgendaCriarComponent } from './components/agenda/agenda-criar/agenda-criar.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registar-medico', component: RegistarMedicoComponent },
    ]
  },
  {
    path: 'user/perfil-medico', component: PerfilMedicoComponent, canActivate: [AuthGuard]
  },
  { path: 'pacientes', redirectTo: 'pacientes/lista' },
  {
    path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard],
    children: [
      { path: 'informacao/:id', component: PacienteInformacaoComponent, canActivate: [AuthGuard] },
      { path: 'informacao', component: PacienteInformacaoComponent, canActivate: [AuthGuard] },
      { path: 'lista', component: PacienteListaComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'medicos', redirectTo: 'medicos/lista' },
  {
    path: 'medicos', component: MedicosComponent, canActivate: [AuthGuard],
    children: [
      { path: 'informacao/:id', component: MedicoInformacaoComponent, canActivate: [AuthGuard] },
      { path: 'informacao', component: MedicoInformacaoComponent, canActivate: [AuthGuard] },
      { path: 'lista', component: MedicoListaComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'agenda', redirectTo: 'agenda/lista' },
  {
    path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard],
    children: [
      { path: 'criar/:id', component: AgendaCriarComponent, canActivate: [AuthGuard] },
      { path: 'criar', component: AgendaCriarComponent, canActivate: [AuthGuard] },
      { path: 'informacao/:id', component: AgendaInformacaoVisualizarComponent, canActivate: [AuthGuard] },
      { path: 'informacao', component: AgendaInformacaoVisualizarComponent, canActivate: [AuthGuard] },
      { path: 'lista', component: AgendaListaComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
