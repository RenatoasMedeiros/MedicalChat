import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  events = ['new-user','bye-user'];
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
    this.socket.emit('join', data);
  }
}
