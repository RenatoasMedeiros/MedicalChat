import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agenda-informacao-editar',
  templateUrl: './agenda-informacao-editar.component.html',
  styleUrls: ['./agenda-informacao-editar.component.scss']
})
export class AgendaInformacaoEditarComponent implements OnInit {

  public form: FormGroup;

  get f(): any {
    return this.form.controls;

  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      medicoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      medicoEmail: ['', [Validators.required, Validators.email]],
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

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }
}
