import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  public pacientes: any = [];
  public pacientesFiltrados: any = [];
  widthFoto: number = 50;
  marginFoto: number = 2;
  exibirFoto: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista() {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    // Se filtroLista possuir algum valor, filtrarPacientes == filtrolista
    this.pacientesFiltrados = this.filtroLista ? this.filtrarPacientes(this.filtroLista) : this.pacientes;
  }

  filtrarPacientes(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.pacientes.filter(
      paciente => paciente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  isCollapsed = true;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.getPacientes();
  }

  alterarEstadoFoto(){
    this.exibirFoto = !this.exibirFoto;
  }

  public getPacientes(): void{
    this.http.get('https://localhost:5001/api/pacientes').subscribe(
      response => {
        this.pacientes = response;
        this.pacientesFiltrados = this.pacientes;
      },
      error => console.log(error)
    );
  }
}
