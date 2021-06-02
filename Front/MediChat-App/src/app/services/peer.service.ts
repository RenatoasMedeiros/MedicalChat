import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer: any;

  constructor() {
    // Declaramos um Peer
    this.peer = new Peer(undefined, { //Id undefined
      host: 'localhost',
      port: 3001 // porta 3000 é para o socket io
    });
   }
}
