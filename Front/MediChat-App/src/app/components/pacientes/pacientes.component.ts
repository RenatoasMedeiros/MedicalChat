import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/Paciente';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  modalRef: BsModalRef;

  public pacientes: Paciente[] = [];
  public pacientesFiltrados: Paciente[] = [];

  public widthFoto: number = 50;
  public marginFoto: number = 2;
  public exibirFoto: boolean = true;
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
    private spinner: NgxSpinnerService
  ) { }


  public ngOnInit(): void {
    this.spinner.show();
    this.getPacientes();
  }

  public alterarEstadoFoto(): void{
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
}
