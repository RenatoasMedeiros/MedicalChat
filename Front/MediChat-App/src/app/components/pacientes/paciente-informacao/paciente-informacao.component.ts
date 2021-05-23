import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PacienteService } from '@app/services/paciente.service';
import { Paciente } from '@app/models/Paciente';
import { VideoChatService } from '@app/services/videoChat.service';
import { VideoChat } from '@app/models/VideoChat';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paciente-informacao',
  templateUrl: './paciente-informacao.component.html',
  styleUrls: ['./paciente-informacao.component.scss']
})
export class PacienteInformacaoComponent implements OnInit {

  paciente = {} as Paciente; // inicializar paciente do tipo Paciente
  pacienteId: number;

  form: FormGroup;
  estadoGuardar = 'post'; // Inicia em post para criar um novo paciente

  locale = 'pt'; // idioma português

  get modoEditar(): boolean {
    return this.estadoGuardar === 'put';
  }

  get videoChats(): FormArray { // retorna as Video Chamadas
    return this.form.get('videoChats') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true, // Escolhe uma posição favorável (cima ou baixo)
      dateInputFormat: 'DD/MM/YYYY', // formatação do input
      showWeekNumbers: false // não mostrar os dias da semana
    };
  }

  get bsConfigVideoChat(): any {
    return {
      adaptivePosition: true, // Escolhe uma posição favorável (cima ou baixo)
      dateInputFormat: 'DD/MM/YYYY HH:mm', // formatação do input
      showWeekNumbers: false // não mostrar os dias da semana
    };
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private pacienteService: PacienteService,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService,
              private router: Router,
              private videoChatService :VideoChatService
  ) { this.localeService.use(this.locale); }

  public carregarPaciente(): void {
    this.pacienteId = +this.activatedRouter.snapshot.paramMap.get('id');

    if(this.pacienteId !== null && this.pacienteId !== 0){ // verifico se o get é diferente de nulo
      this.spinner.show(); // ativa o spinner

      this.estadoGuardar = 'put'; // PUT pois vai editar

      this.pacienteService.getPacienteById(this.pacienteId).subscribe( // + para converter para o tipo INT, pois o pacienteId é retornado como uma string
        { // subscrive recebe um observable com 3 propriedades
          next: (paciente: Paciente) => { // realiza uma copia do objeto do parametro e atribui para dentro do paciente
            this.paciente = {...paciente}; // SPREAD (cada paciente é atribuido aos pacientes)
            this.form.patchValue(this.paciente); // definir os valores recebidos no formulário
            this.carregarVideoChats();
          },
          error: (error: any) => {
            this.spinner.hide(); // Esconde o spinner
            this.toaster.error('Erro ao tentar carregar os Pacientes.'); // Em caso de erro mostra um toaster
            console.error(error);
          },
          complete: () => this.spinner.hide(), // Esconde o spinner
        }
      )
    }
  }

  public carregarVideoChats(): void {
    this.videoChatService.getVideoChatsByPacienteId(this.pacienteId).subscribe(
      (videoChatsRetorno: VideoChat[]) => {
        videoChatsRetorno.forEach(videoChat => {
          this.videoChats.push(this.criarVideoChat(videoChat));
        });
      },
      (error) => {
        this.toaster.error('Erro ao tentar carregar as Consultas', 'Erro')
        console.error(error);
      },
    ).add(() => this.spinner.hide());
  }

  ngOnInit(): void {
    this.carregarPaciente();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telemovel: ['', [Validators.required]],
      foto: [''],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      endereco: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      codPostal: ['', Validators.required],
      videoChats: this.fb.array([])
    });
  }

  criarVideoChat(videoChat: VideoChat): FormGroup {
    return this.fb.group({
      id: [videoChat.id],
      relatorio: [videoChat.relatorio],
      token: [videoChat.token],
      dataInicio: [videoChat.dataInicio, Validators.required],
      dataFim: [videoChat.dataFim],
      estadoVideoChat: [videoChat.estadoVideoChat, Validators.required],
      medico: [videoChat.medico.username, Validators.required],
      paciente: [videoChat.paciente.nome, Validators.required]
    });
  };

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public guardarPaciente(): void {
    this.spinner.show();
    if(this.form.valid) {
      this.paciente = (this.estadoGuardar === 'post')
                    ? {...this.form.value} // atribui ao paciente o formulário (Se o mesmo for válido) (SPREAD OPERATOR)
                    : { id: this.paciente.id, ...this.form.value} // atribui ao paciente o formulário, MENOS o Id pois ele tem que se manter visto que é um PUT (Se o mesmo for válido) (SPREAD OPERATOR)

      this.pacienteService[this.estadoGuardar](this.paciente).subscribe(
        (pacienteRetorno: Paciente) => {                                     // NEXT
          this.toaster.success('Paciente guardado com Sucesso!', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toaster.error('Erro ao guardar o Paciente', 'Erro');
        }, // ERROR
        () => this.spinner.hide() // COMPLETE
      );
    }
  }
}
