import { AgendaComponent } from './components/agenda/agenda.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './components/pacientes/pacientes.component';

const routes: Routes = [
  { path: 'pacientes', component: PacientesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
