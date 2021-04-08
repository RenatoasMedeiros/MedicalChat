import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agenda-informacao',
  templateUrl: './agenda-informacao.component.html',
  styleUrls: ['./agenda-informacao.component.scss']
})
export class AgendaInformacaoComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
      telemovel: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
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
