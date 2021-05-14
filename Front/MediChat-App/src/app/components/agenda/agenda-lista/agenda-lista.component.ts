import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VideoChat } from '@app/models/VideoChat';
import { VideoChatService } from '@app/services/videoChat.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { isObservable } from 'rxjs';



@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.scss']
})
export class AgendaListaComponent implements OnInit {

  modalRef: BsModalRef;

  public videoChat: VideoChat[] = [];
  public videoChatFiltrada: VideoChat[] = [];

  public mobile: boolean = false;

  private _filtroLista: string = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    // Se filtroLista possuir algum valor, filtrarVideoChat == filtrolista
    this.videoChatFiltrada = this.filtroLista ? this.filtrarVideoChat(this.filtroLista) : this.videoChat;
  }

  public filtrarVideoChat(filtrarPor: string): VideoChat[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.videoChat.filter(
      videoChat => videoChat.medico.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      videoChat.paciente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private videoChatService: VideoChatService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getVideoChats();
    if (window.screen.width >= 375) {
      this.mobile = true;
    }
  }

  public getVideoChats(): void{
    this.videoChatService.getVideoChats().subscribe({
      next: (_videoChat: VideoChat[]) => {
        this.videoChat = _videoChat;
        this.videoChatFiltrada = this.videoChat;
      },
      error: error => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carregar as Consultas', 'Erro!')
      },

      complete: () => this.spinner.hide()
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('A Consulta foi apagada com sucesso!', 'Apagado!');
  }

  decline(): void {
    this.modalRef.hide();
  }

  infoVideoChat(id: number): void {
    this.router.navigate([`agenda/informacao/${id}`]);
  }

  editarVideoChat(id: number): void {
    this.router.navigate([`agenda/criar/${id}`]);
  }
}
