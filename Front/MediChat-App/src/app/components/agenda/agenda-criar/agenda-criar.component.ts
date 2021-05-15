import { Paciente } from '@app/models/Paciente';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agenda-criar',
  templateUrl: './agenda-criar.component.html',
  styleUrls: ['./agenda-criar.component.scss']
})
export class AgendaCriarComponent implements OnInit {

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
