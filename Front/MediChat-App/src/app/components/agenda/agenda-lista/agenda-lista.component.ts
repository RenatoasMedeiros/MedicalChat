import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VideoChat } from '@app/models/VideoChat';
import { VideoChatService } from '@app/services/videoChat.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { isObservable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.scss']
})
export class AgendaListaComponent implements OnInit {

  modalRef: BsModalRef;

  public videoChat: VideoChat[] = [];
  public videoChatFiltrada: VideoChat[] = [];
  public videoChatId = 0;
  medicoId = sessionStorage.getItem('id');

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
      videoChat => videoChat.medico.username.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
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
    if(this.medicoId != "3"){ // Id do ADMINISTRADOR
      this.GetVideoChatsByMedicoId();
    } else {
      this.getVideoChats();
    }
    if (window.screen.width >= 375) {
      this.mobile = true;
    }
  }

  public getVideoChats(): void {
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

  // Carrega todas as Consultas do medico logado
  public GetVideoChatsByMedicoId(): void {
    this.videoChatService.getVideoChatsByMedicoId(+this.medicoId).subscribe( // + para converter para int
      (videoChatsRetorno: VideoChat[]) => {
        videoChatsRetorno.forEach(videoChat => {
          this.videoChat = videoChatsRetorno;
          this.videoChatFiltrada = this.videoChat;
        });
      },
      (error) => {
        this.toastr.error('Erro ao tentar carregar as Consultas', 'Erro')
        console.error(error);
      },
    ).add(() => this.spinner.hide());
  };

  openModal(event: any, template: TemplateRef<any>, videoChatId: number): void {
    event.stopPropagation(); // nao propaga o evento do click
    this.videoChatId = videoChatId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.videoChatService.deleteVideoChat(this.videoChatId).subscribe(
      (resultado: any) => { // NEXT
        if(resultado.mensagem == 'Apagado'){
          this.toastr.success('A Consulta foi apagada com sucesso!', 'Apagado!');
          this.GetVideoChatsByMedicoId(); // volta a buscar todas as consultas do medico
        }
      },
      (error: any) => { // ERROR
        console.error(error);
        this.toastr.error(`Erro ao tentar Apagar a Consultas ${this.videoChatId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());
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
