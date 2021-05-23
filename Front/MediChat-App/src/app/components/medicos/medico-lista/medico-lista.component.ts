import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '@app/models/Medico';
import { MedicoService } from '@app/services/medico.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medico-lista',
  templateUrl: './medico-lista.component.html',
  styleUrls: ['./medico-lista.component.scss']
})
export class MedicoListaComponent implements OnInit {

  modalRef: BsModalRef;

  public medicos: Medico[];
  public medicosFiltrados: Medico[] = [];

  private _filtroLista: string = '';


  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    // Se filtroLista possuir algum valor, filtrarMedico == filtrolista
    this.medicosFiltrados = this.filtroLista ? this.filtrarMedicos(this.filtroLista) : this.medicos;
  }

  public filtrarMedicos(filtrarPor: string): Medico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.medicos.filter(
      medico => medico.username.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || medico.especialidade.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private medicoService: MedicoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getMedicos();
  }

  public getMedicos(): void{
    this.medicoService.getMedicos().subscribe({
      next: (_medicos: Medico[]) => {
        this.medicos = _medicos;
        this.medicosFiltrados = this.medicos;
      },
      error: error => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carregar os Medicos', 'Erro!')
      },

      complete: () => this.spinner.hide()
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Medico foi apagado com sucesso!', 'Apagado!');
  }

  decline(): void {
    this.modalRef.hide();
  }

  infoPaciente(id: number): void {
    this.router.navigate([`medicos/informacao/${id}`]);
  }

}
