import { MedicoService } from '@app/services/medico.service';
import { Medico } from './../../../models/Medico';
import { ValidatorField } from './../../../helpers/ValidatorField';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registar-medico',
  templateUrl: './registar-medico.component.html',
  styleUrls: ['./registar-medico.component.scss']
})
export class RegistarMedicoComponent implements OnInit {

  public form: FormGroup;
  medico: Medico;

  file: File;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmarPassword')
    };

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telemovel: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      especialidade: ['', Validators.required],
      foto: [''],
      endereco: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      codPostal: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@#$!%*?&]).{8,30}')]],
      confirmarPassword: ['',Validators.required]
    }, formOptions);
  }

  onFileChange(event){
    const reader = new FileReader();

    // Verifica se é um arquivo e se ela possui tamanho
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files; // atribuimos o arquivo a variavel file
    }
  }

  uploadImagem(): void {
      const nomeArquivo = this.medico.foto.split('\\', 3); //Split na barra EX: [C:, imagens, foto.png]
      this.medico.foto = nomeArquivo[2];
      this.medicoService.postUpload(this.file, nomeArquivo[2]).subscribe();
  }

  public registarMedico() {
    this.spinner.show();
    if(this.form.valid) { //verifica se o formulario está válido
      this.medico = {...this.form.value};
      this.uploadImagem();
      this.medicoService.registar(this.medico).subscribe(
        next => {
          this.router.navigate(['/user/login']);
          this.toaster.success('Registo realizado com Sucesso.')
        }, // NEXT
        error => {
          const erro = error.error;
          console.error(error);
          this.spinner.hide();
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toaster.error('O Endereço de email já foi cadastrado', 'Erro');
                break;
              default:
                this.toaster.error(`Erro ao registar o Médico! CODE: ${element.code}`, 'Erro');
              break;
            }
          });

        }, // ERROR
        () => this.spinner.hide() // COMPLETE
      )
    }
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }
}
