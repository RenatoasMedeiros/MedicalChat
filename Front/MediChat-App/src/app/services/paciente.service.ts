import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '@app/models/Paciente';

@Injectable(
  // {providedIn: 'root'}
  )
export class PacienteService {
  baseURL = 'https://localhost:5001/api/pacientes';

constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseURL)
  }

  getPacientesByNome(nome: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseURL}/${nome}/nome`);
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseURL}/${id}`);
  }

  postPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseURL, paciente);
  }

  putPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseURL}/${id}`, paciente);
  }

  deletePaciente(id: number): Observable<any> { // vai receber um objeto
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}
