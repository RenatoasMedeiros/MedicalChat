import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/Medico';

@Injectable(
  // {providedIn: 'root'}
  )
export class MedicoService {
  baseURL = 'https://localhost:5001/api/Medicos';

constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.baseURL)
  }

  getMedicosByNome(nome: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.baseURL}/${nome}/nome`);
  }

  getMedicosByEspecialidade(especialidade: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.baseURL}/${especialidade}/especialidade`);
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.baseURL}/${id}`);
  }

}
