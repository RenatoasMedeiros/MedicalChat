import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '@app/models/Paciente';
import { PacienteService } from '@app/services/paciente.service';

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.scss']
})
export class PacienteListaComponent implements OnInit {

  modalRef: BsModalRef;

  public pacientes: Paciente[] = [];
  public pacientesFiltrados: Paciente[] = [];
  // pacientePrimeroNome = paciente => paciente.nome.split('^\w+').slice(0);
  // pacienteUltimoNome = paciente => paciente.nome.split('(?<=^\w+\s).+').slice(0);


  public widthFoto: number = 50;
  public marginFoto: number = 2;
  public exibirFoto: boolean = true;
  public mobile: boolean = false;

  private _filtroLista: string = '';


  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    // Se filtroLista possuir algum valor, filtrarPacientes == filtrolista
    this.pacientesFiltrados = this.filtroLista ? this.filtrarPacientes(this.filtroLista) : this.pacientes;
  }

  public filtrarPacientes(filtrarPor: string): Paciente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.pacientes.filter(
      paciente => paciente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private pacienteService: PacienteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }


  public ngOnInit(): void {
    this.spinner.show();
    this.getPacientes();
    if (window.screen.width <= 375) {
      this.mobile = true;
    }
  }

  public alterarEstadoFoto(): void {
    this.exibirFoto = !this.exibirFoto;
  }

  public getPacientes(): void{
    this.pacienteService.getPacientes().subscribe({
      next: (_pacientes: Paciente[]) => {
        this.pacientes = _pacientes;
        this.pacientesFiltrados = this.pacientes;
      },
      error: error => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carregar os Pacientes', 'Erro!')
      },

      complete: () => this.spinner.hide()
    });
  }

  // public Primeiro_UltimoNome(primeiro_ultimoNome: string): string {
  //   paciente => primeiro_ultimoNome = paciente.nome.split(' ');
  //   console.log(primeiro_ultimoNome)
  //   return primeiro_ultimoNome;
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Paciente foi apagado com sucesso!', 'Apagado!');
  }

  decline(): void {
    this.modalRef.hide();
  }

  infoPaciente(id: number): void {
    this.router.navigate([`pacientes/informacao/${id}`]);
  }
}
