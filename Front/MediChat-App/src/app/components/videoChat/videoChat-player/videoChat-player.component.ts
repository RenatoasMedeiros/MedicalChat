import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-videoChat-player',
  templateUrl: './videoChat-player.component.html',
  styleUrls: ['./videoChat-player.component.scss']
})
export class VideoChatPlayerComponent implements OnInit {

  @Input() stream: any;

  constructor() { }

  ngOnInit() {
  }

}
