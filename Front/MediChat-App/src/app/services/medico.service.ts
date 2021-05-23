import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/Medico';
import { take, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable(
  // {providedIn: 'root'}
  )
export class MedicoService {
  baseURL = 'https://localhost:5001/api/Medicos';
  jwtHelper = new JwtHelperService(); //Service Jwt do angular - Verificar o token
  TokenDescodificador: any;

constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.baseURL)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getMedicosByNome(nome: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.baseURL}/${nome}/nome`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getMedicosByEspecialidade(especialidade: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.baseURL}/${especialidade}/especialidade`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.baseURL}/${id}`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  put(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.baseURL}/${medico.id}`, medico)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  // LOGIN ------------
  login(model: Medico) {
    return this.http.post(`${this.baseURL}/Login`, model).pipe(
      map((response: any) => {
        const user = response;
        if(user) {
          localStorage.setItem('token', user.token);
          this.TokenDescodificador = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('username', this.TokenDescodificador.unique_name);
        }
      })
    );
  }

  // REGISTAR
  registar(medico: Medico) {
    return this.http.post<Medico>(this.baseURL, medico)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

}
