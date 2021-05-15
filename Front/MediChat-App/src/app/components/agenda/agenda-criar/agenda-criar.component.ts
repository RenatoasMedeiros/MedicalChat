import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoChat } from '@app/models/VideoChat';
import { VideoChatService } from '@app/services/videoChat.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agenda-criar',
  templateUrl: './agenda-criar.component.html',
  styleUrls: ['./agenda-criar.component.scss']
})
export class AgendaCriarComponent implements OnInit {

  locale = 'pt'; // idioma português

  public form: FormGroup;

  videoChat = {} as VideoChat;

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
    private videoChatService: VideoChatService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { this.localeService.use(this.locale); }

  public carregarConsultas(): void {
    const videoChatIdParam = this.router.snapshot.paramMap.get('id');

    if(videoChatIdParam !== null){ // verifico se o get é diferente de nulo
      this.spinner.show(); // ativa o spinner
      this.videoChatService.getVideoChatById(+videoChatIdParam).subscribe( // + para converter para o tipo INT, pois o pacienteId é retornado como uma string
        { // subscrive recebe um observable com 3 propriedades
          next: (videoChat: VideoChat) => { // realiza uma copia do objeto do parametro e atribui para dentro do paciente
            this.videoChat = {...videoChat}; // SPREAD (cada paciente é atribuido aos pacientes)
            this.form.patchValue(this.videoChat); // definir os valores recebidos no formulário
          },
          error: (error: any) => {
            this.spinner.hide(); // Esconde o spinner
            this.toaster.error('Erro ao tentar carregar as Consultas.'); // Em caso de erro mostra um toaster
            console.error(error);
          },
          complete: () => this.spinner.hide(), // Esconde o spinner
        }
      )
    }
  }

  ngOnInit(): void {
    this.carregarConsultas();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      medico: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      paciente: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      dataInicio: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
