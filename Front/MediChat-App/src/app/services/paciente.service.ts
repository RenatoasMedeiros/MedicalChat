import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '@app/models/Paciente';
import { take } from 'rxjs/operators';

@Injectable(
  // {providedIn: 'root'}
  )
export class PacienteService {
  baseURL = 'https://localhost:5001/api/pacientes';

constructor(private http: HttpClient) {}

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseURL)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getPacientesByNome(nome: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseURL}/${nome}/nome`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseURL}/${id}`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  post(paciente: Paciente[]): Observable<Paciente[]> {
    return this.http.post<Paciente[]>(this.baseURL, paciente)
      .pipe(take(1)); // Só permite uma chamada
  }

  put(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseURL}/${paciente.id}`, paciente)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  deletePaciente(id: number): Observable<any> { // vai receber um objeto
    return this.http.delete<any>(`${this.baseURL}/${id}`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  postUpload(file: File, nome: string): Observable<any>{
    const fileToUpload = <File>file[0]; //1º posição do file que é um array
    const formData = new FormData();
    formData.append('file', fileToUpload, nome);

    return this.http.post(`${this.baseURL}/uploadImagem`, formData)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

}
