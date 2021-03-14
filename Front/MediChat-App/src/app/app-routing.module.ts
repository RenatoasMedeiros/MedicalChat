import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RegistarUserComponent } from './components/user/registar-user/registar-user.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AgendaComponent } from './components/agenda/agenda.component';

import { MedicosComponent } from './components/medicos/medicos.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteInformacaoComponent } from './components/pacientes/paciente-informacao/paciente-informacao.component';
import { PacienteListaComponent } from './components/pacientes/paciente-lista/paciente-lista.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registar', component: RegistarUserComponent },
    ]
  },
  {
    path: 'user/perfil', component: PerfilComponent
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
  { path: 'dashboard', component: DashboardComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
