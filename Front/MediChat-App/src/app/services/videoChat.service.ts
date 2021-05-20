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

  getVideoChatsByPacienteId(pacienteId: number): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(`${this.baseURL}/paciente/${pacienteId}`)
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

  post(videoChat: VideoChat[]): Observable<VideoChat[]> {
    return this.http.post<VideoChat[]>(this.baseURL, videoChat)
      .pipe(take(1)); // Só permite uma chamada
  }

  put(videoChat: VideoChat): Observable<VideoChat> {
    return this.http.put<VideoChat>(`${this.baseURL}/${videoChat.id}`, videoChat)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }

  deleteVideoChat(id: number): Observable<any> { // vai receber um objeto
    return this.http.delete<any>(`${this.baseURL}/${id}`)
      .pipe(take(1)); // Só permite uma chamada - depois dá unsubscrive
  }
}
