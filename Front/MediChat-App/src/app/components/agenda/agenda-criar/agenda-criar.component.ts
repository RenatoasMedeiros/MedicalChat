import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { PacienteService } from './../../../services/paciente.service';
import { MedicoService } from './../../../services/medico.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoChat } from '@app/models/VideoChat';
import { VideoChatService } from '@app/services/videoChat.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Medico } from '@app/models/Medico';
import { Paciente } from '@app/models/Paciente';
import { v4 as uuidv4 } from 'uuid';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-agenda-criar',
  templateUrl: './agenda-criar.component.html',
  styleUrls: ['./agenda-criar.component.scss']
})
export class AgendaCriarComponent implements OnInit {

  locale = 'pt'; // idioma português

  modalRef: BsModalRef;

  public form: FormGroup;
  public videoChatId = 0;

  public medicos: Medico[] = [];
  public pacientes: Paciente[] = [];
  medicoId = sessionStorage.getItem('id');

  videoChat = {} as VideoChat;
  estadoGuardar = 'post'; // Inicia em post para criar um novo paciente

  get modoEditar(): boolean {
    return this.estadoGuardar === 'put';
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true, // Escolhe uma posição favorável (cima ou baixo)
      dateInputFormat: 'DD/MM/YYYY HH:mm', // formatação do input
      showWeekNumbers: false // não mostrar os dias da semana
    }
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private route: Router,
    private videoChatService: VideoChatService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { this.localeService.use(this.locale); }

  public carregarConsultas(): void {
    const videoChatIdParam = this.router.snapshot.paramMap.get('id'); //recebe o id da url

    if(videoChatIdParam !== null){ // verifico se o get é diferente de nulo
      this.spinner.show(); // ativa o spinner
      this.estadoGuardar = 'put';
      this.videoChatService.getVideoChatById(+videoChatIdParam).subscribe( // + para converter para o tipo INT, pois o pacienteId é retornado como uma string
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

  public getMedicos(): void{
    this.medicoService.getMedicos().subscribe({
      next: (_medico: Medico[]) => {
        this.medicos = _medico;
      },
      error: error => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carregar os Medicos', 'Erro!')
      },
      complete: () => this.spinner.hide()
    });
  }

  public getPacientes(): void{
    this.pacienteService.getPacientes().subscribe({
      next: (_paciente: Paciente[]) => {
        this.pacientes = _paciente;
      },
      error: error => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carregar os Pacientes', 'Erro!')
      },
      complete: () => this.spinner.hide()
    });
  }

  criarVideoChat(videoChat: VideoChat): FormGroup {
    return this.fb.group({
      id: [videoChat.id],
      relatorio: [videoChat.relatorio, Validators.maxLength(3000)],
      token: [videoChat.token],
      dataInicio: [videoChat.dataInicio, Validators.required],
      dataFim: [""],
      estadoVideoChat: [0, Validators.required],
      medicoID: [videoChat.medicoID, Validators.required],
      pacienteID: [videoChat.pacienteID, Validators.required]
    });
  };

  ngOnInit(): void {
    this.carregarConsultas();
    this.getMedicos();
    this.getPacientes();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      medicoID: [this.medicoId, [Validators.required]],
      pacienteID: ['', [Validators.required]],
      dataInicio: ['', Validators.required],
      relatorio: ['', Validators.maxLength(3000)],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  openModal(event: any, template: TemplateRef<any>, videoChatId: number): void {
    event.stopPropagation(); // nao propaga o evento do click
    this.videoChatId = videoChatId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmIniciarConsulta(id: number): void {
    this.modalRef.hide();
    this.route.navigate([`consulta/${id}/${uuidv4()}`]);
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public guardarVideoChat(): void {
    this.spinner.show();
    if(this.form.valid) {
      this.videoChat = (this.estadoGuardar === 'post')
                    ? {...this.form.value} // atribui ao paciente o formulário (Se o mesmo for válido) (SPREAD OPERATOR)
                    : { id: this.videoChat.id, ...this.form.value} // atribui ao paciente o formulário, MENOS o Id pois ele tem que se manter visto que é um PUT (Se o mesmo for válido) (SPREAD OPERATOR)
      console.log(this.videoChat);
      this.videoChatService[this.estadoGuardar](this.videoChat).subscribe(
        (videoChatRetorno: VideoChat) => {                                     // NEXT
          this.toastr.success('Consulta agendada com Sucesso!', 'Sucesso');
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
}
