import { VideoChatService } from './../../services/videoChat.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { PeerService } from '@app/services/peer.service';
import { WebSocketService } from '@app/services/web-socket.service';
import { VideoChat } from '@app/models/VideoChat';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { setHours } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-videoChat',
  templateUrl: './videoChat.component.html',
  styleUrls: ['./videoChat.component.scss']
})
export class VideoChatComponent implements OnInit {
  roomName: string; // id (hash) da sala
  currentStream: any;
  listUser: Array<any> = [];

  videoChat = {} as VideoChat;
  videoChatIdParam = this.route.snapshot.paramMap.get('id');

  dataFim = new Date().toISOString();

  public form: FormGroup;

  get f(): any {
    return this.form.controls;
  }


  constructor(private route: ActivatedRoute,
              private webSocketService: WebSocketService,
              private peerService: PeerService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private videoChatService: VideoChatService
  ) { this.roomName = route.snapshot.paramMap.get('idConsulta'); }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
    if(localStorage.getItem('token') != null) this.carregarConsulta(); // se nao existir token nao chama carregarConsulta
    this.validation();
  }

  initPeer = () => {
    const {peer} = this.peerService;
    peer.on('open', (id) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };

      this.webSocketService.joinRoom(body);
    });


    peer.on('call', callEnter => {
      callEnter.answer(this.currentStream); // Responde a stream
      callEnter.on('stream', (streamRemote) => {
        this.addVideoUser(streamRemote); // adiciona o novo usuario
      });
    }, err => {
      console.log('*** ERROR *** Peer call ', err);
    });
  }

  initSocket = () => {
    this.webSocketService.callbackEvent.subscribe(res => {
      if (res.name === 'new-user') {
        const {idPeer} = res.data;
        this.sendCall(idPeer, this.currentStream);
      }
    })
  }

  checkMediaDevices = () => { //Verifica se exite camera
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);

      }).catch(() => {
        console.log('*** ERROR *** Not permissions');
      });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  sendCall = (idPeer, stream) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    if (!!newUserCall) { //verifica se existe o evento
      newUserCall.on('stream', (userStream) => {
        this.addVideoUser(userStream);
      })
    }
  }


  public carregarConsulta(): void {

    if(this.videoChatIdParam !== null){ // verifico se o get é diferente de nulo
      this.spinner.show(); // ativa o spinner
      this.videoChatService.getVideoChatById(+this.videoChatIdParam).subscribe( // + para converter para o tipo INT, pois o pacienteId é retornado como uma string
        { // subscrive recebe um observable com 3 propriedades
          next: (videoChat: VideoChat) => { // realiza uma copia do objeto do parametro e atribui para dentro do paciente
            this.videoChat = {...videoChat}; // SPREAD (cada paciente é atribuido aos pacientes)
            this.form.patchValue(this.videoChat); // definir os valores recebidos no formulário
          },
          error: (error: any) => {
            this.spinner.hide(); // Esconde o spinner
            this.toastr.error('Erro ao tentar carregar as Consultas.'); // Em caso de erro mostra um toaster
            console.error(error);
          },
          complete: () => this.spinner.hide(), // Esconde o spinner
        }
      )
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      relatorio: ['', Validators.maxLength(3000)],
      dataInicio: [this.videoChat.dataInicio, Validators.required],
      medicoID: [this.videoChat.medicoID, Validators.required],
      pacienteID: [this.videoChat.pacienteID, Validators.required]
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public guardarVideoChat(): void {
    this.spinner.show();
    if(this.form.valid) {
      this.videoChat = { id: +this.videoChatIdParam, estadoVideoChat: 1, token: this.roomName, dataFim: this.dataFim, ...this.form.value} // atribui ao paciente o formulário, MENOS o Id pois ele tem que se manter visto que é um PUT (Se o mesmo for válido) (SPREAD OPERATOR)
      console.log(this.videoChat);
      this.videoChatService.put(this.videoChat).subscribe(
        (videoChatRetorno: VideoChat) => {                                     // NEXT
          this.toastr.success('Consulta Finalizada com Sucesso!', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao agendar a consulta', 'Erro');
        }, // ERROR
        () => this.spinner.hide() // COMPLETE
      );
    }
  }

  public enviarEmail(): void {
    this.videoChat = { id: +this.videoChatIdParam, token: this.roomName, ...this.form.value} // atribui ao paciente o formulário, MENOS o Id pois ele tem que se manter visto que é um PUT (Se o mesmo for válido) (SPREAD OPERATOR)
      console.log(this.videoChat);
      this.videoChatService.putEnviaEmail(this.videoChat).subscribe(
        (videoChatRetorno: VideoChat) => {                                     // NEXT
          this.toastr.success('E-mail enviado com Sucesso!', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao enviar E-mail', 'Erro');
        }, // ERROR
        () => this.spinner.hide() // COMPLETE
      );
  }

  showForm(): boolean {
    if(localStorage.getItem('token') == null) //Verifica se é um utilizador
      return false;
    return true;
  }
}
