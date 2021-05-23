import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
      if(localStorage.getItem('token') !== null){
         //Clona todas requisição para adicionar um header
        const cloneReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        });
        return next.handle(cloneReq).pipe(
          tap( // empilha todas as requisições
            succ => {}, //em caso de sucesso não faz nada
            err => { //em caso de erro
              if(err.status == 401){ // se retornar um erro 401 dá redirect para o login
                this.router.navigateByUrl('user/login');
              }
            }
          )
        );
      } else{
        return next.handle(req.clone());
      }
    }
}
