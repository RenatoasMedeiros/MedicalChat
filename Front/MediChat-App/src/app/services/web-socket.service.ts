import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io'; // Importamos o socket io

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  events = ['new-user','bye-user']; // Todos os eventos possiveis
  callbackEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private socket: Socket) {
    this.listener();
  }


  listener = () => { // lê os eventos que o servidor emite
    this.events.forEach(eventName => {
      this.socket.on(eventName, data => this.callbackEvent.emit({
        name: eventName,
        data: data
      }));
    });
  };

  //Envia a informação do usuario
  joinRoom = (data) => {
    this.socket.emit('join', data); // emite um join e as informações (data)
  }
}
