import { ValidatorField } from './../../../helpers/ValidatorField';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registar-medico',
  templateUrl: './registar-medico.component.html',
  styleUrls: ['./registar-medico.component.scss']
})
export class RegistarMedicoComponent implements OnInit {

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

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmarPassword')
    };

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telemovel: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      especializacao: ['', Validators.required],
      endereco: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      codPostal: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['',Validators.required]
    }, formOptions);
  }
}
