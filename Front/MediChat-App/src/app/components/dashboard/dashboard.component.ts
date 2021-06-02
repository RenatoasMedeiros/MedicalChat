import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  userName(){
    var nome = sessionStorage.getItem('username');
    return (nome.split(" ")[0] + " " + nome.split(" ")[nome.split(" ").length - 1]); // retorna o primeiro e o ultimo nome do utilizador
}

}
