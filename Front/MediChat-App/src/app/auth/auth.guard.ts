import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate( // quando for chamada recebe um snapshot da rota e um snapshot estado da rota
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token') !== null) { //faz a verificação do token
        return true;
      }
      else { // se o token não existir redireciona para o login
        this.router.navigate(['/user/login']);
        return false;
      }
  }

}
