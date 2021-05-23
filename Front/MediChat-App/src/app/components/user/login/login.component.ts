import { MedicoService } from '@app/services/medico.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public medicoService: MedicoService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    this.spinner.show();
    this.medicoService.login(this.model).subscribe(
      next => {
        this.router.navigate(['/dashboard']);
        this.toastr.success('Login efetuado com sucesso!');
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Falha ao tentar fazer Login!', 'Erro');
      },
      () => this.spinner.hide()
    )
  }
}
