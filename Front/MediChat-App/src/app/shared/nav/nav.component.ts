import { ToastrService } from 'ngx-toastr';
import { MedicoService } from '@app/services/medico.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  isCollapsed = true;

  constructor(
    private router: Router,
    private medicoService: MedicoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  showMenu(): boolean {
    if(localStorage.getItem('token') == null) //Verifica se o utilizador é administrador
      return false;
    var menu = this.router.url !== '/user/login';
    return menu;
  }

  loggedIn() {
    return this.medicoService.loggedIn();
  }

  entrar() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    localStorage.removeItem('token'); // Remove o token da localStorage
    this.toastr.show('Log Out efetuado com sucesso.'); // Toastr de Logout
    this.router.navigate(['/user/login']); // Redireciona para a pagina de login
  }

  email(){
    return localStorage.getItem('email');
  }

  public administrador(): boolean {
    if(localStorage.getItem('username') == "admin") //Verifica se o utilizador é administrador
      return true;
    return false; // Se não for retorna False
  }
}
