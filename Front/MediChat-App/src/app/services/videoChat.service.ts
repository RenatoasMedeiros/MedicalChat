import { VideoChat } from '@app/models/VideoChat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable(
  // providedIn: 'root'
)
export class VideoChatService {
  baseURL = 'https://localhost:5001/api/VideoChat';

  constructor(private http: HttpClient) { }

  getVideoChats(): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(this.baseURL)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getVideoChatsByNomeMedico(nomeMedico: string): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(`${this.baseURL}/${nomeMedico}/nome`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getVideoChatsByNomePaciente(nomePaciente: string): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(`${this.baseURL}/${nomePaciente}/nome`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  getVideoChatById(id: number): Observable<VideoChat> {
    return this.http.get<VideoChat>(`${this.baseURL}/${id}`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

}
