import { ToastrService } from 'ngx-toastr';
import { MedicoService } from '@app/services/medico.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    return (this.router.url !== '/user/login');
  }

  loggedIn() {
    return this.medicoService.loggedIn();
  }

  entrar() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }

  userName(){
    return sessionStorage.getItem('username');
  }
}
