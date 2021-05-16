import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/Medico';
import { take } from 'rxjs/operators';

@Injectable(
  // {providedIn: 'root'}
  )
export class MedicoService {
  baseURL = 'https://localhost:5001/api/Medicos';

constructor(private http: HttpClient) { }

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

}
