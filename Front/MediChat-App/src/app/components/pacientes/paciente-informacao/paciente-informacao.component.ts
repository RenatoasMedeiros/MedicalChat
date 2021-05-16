import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PacienteService } from '@app/services/paciente.service';
import { Paciente } from '@app/models/Paciente';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paciente-informacao',
  templateUrl: './paciente-informacao.component.html',
  styleUrls: ['./paciente-informacao.component.scss']
})
export class PacienteInformacaoComponent implements OnInit {

  paciente = {} as Paciente // inicializar paciente do tipo Paciente
  form: FormGroup;
  estadoGuardar = 'post'; // Inicia em post para criar um novo paciente



  locale = 'pt'; // idioma português

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
    private pacienteService: PacienteService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { this.localeService.use(this.locale); }

  public carregarPaciente(): void {
    const pacienteIdParam = this.router.snapshot.paramMap.get('id');

    if(pacienteIdParam !== null){ // verifico se o get é diferente de nulo
      this.spinner.show(); // ativa o spinner

      this.estadoGuardar = 'put'; // PUT pois vai editar

      this.pacienteService.getPacienteById(+pacienteIdParam).subscribe( // + para converter para o tipo INT, pois o pacienteId é retornado como uma string
        { // subscrive recebe um observable com 3 propriedades
          next: (paciente: Paciente) => { // realiza uma copia do objeto do parametro e atribui para dentro do paciente
            this.paciente = {...paciente}; // SPREAD (cada paciente é atribuido aos pacientes)
            this.form.patchValue(this.paciente); // definir os valores recebidos no formulário
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
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public guardarAlteracoes(): void{
    this.spinner.show();
    if(this.form.valid) {
      this.paciente = (this.estadoGuardar === 'post')
                    ? {...this.form.value} // atribui ao paciente o formulário (Se o mesmo for válido) (SPREAD OPERATOR)
                    : { id: this.paciente.id, ...this.form.value} // atribui ao paciente o formulário, MENOS o Id pois ele tem que se manter visto que é um PUT (Se o mesmo for válido) (SPREAD OPERATOR)

      this.pacienteService[this.estadoGuardar](this.paciente).subscribe(
        () => this.toaster.success('Paciente guardado com Sucesso!', 'Sucesso'), // NEXT
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
