import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paciente-informacao',
  templateUrl: './paciente-informacao.component.html',
  styleUrls: ['./paciente-informacao.component.scss']
})
export class PacienteInformacaoComponent implements OnInit {

  public form: FormGroup;

  get f(): any {
    return this.form.controls;

  }

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      pacienteNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      MedicoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      pacienteEmail: ['', [Validators.required, Validators.email]],
      medicoEmail: ['', [Validators.required, Validators.email]],
      relatorio: ['', [Validators.required]],
      telemovel: ['', [Validators.required]],
      foto: [''],
      dataNascimento: ['', Validators.required],
      genero: [''],
      endereco: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      codPostal: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }
}
