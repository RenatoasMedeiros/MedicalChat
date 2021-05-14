import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      medicoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      medicoEmail: ['', [Validators.required, Validators.email]],
      relatorio: ['', [Validators.required, Validators.maxLength(3000)]],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }
}
