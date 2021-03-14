import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/Paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-informacao',
  templateUrl: './paciente-informacao.component.html',
  styleUrls: ['./paciente-informacao.component.scss']
})
export class PacienteInformacaoComponent implements OnInit {

  public pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
  ) { }


  ngOnInit(): void {
    this.getPacientes();
  }

  public getPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (_pacientes: Paciente[]) => {
        this.pacientes = _pacientes;
      },
      error: error => {
        console.log(error)
      },
    });
  }
}
