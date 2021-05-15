import { VideoChat } from '@app/models/VideoChat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable(
  // providedIn: 'root'
)
export class VideoChatService {
  baseURL = 'https://localhost:5001/api/VideoChat';

  constructor(private http: HttpClient) { }

  getVideoChats(): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(this.baseURL)
  }

  getVideoChatsByNomeMedico(nomeMedico: string): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(`${this.baseURL}/${nomeMedico}/nome`);
  }

  getVideoChatsByNomePaciente(nomePaciente: string): Observable<VideoChat[]> {
    return this.http.get<VideoChat[]>(`${this.baseURL}/${nomePaciente}/nome`);
  }

  getVideoChatById(id: number): Observable<VideoChat> {
    return this.http.get<VideoChat>(`${this.baseURL}/${id}`);
  }

}
