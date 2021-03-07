import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {

  public medicos: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMedicos();
  }

  public getMedicos(): void{
    this.http.get('https://localhost:5001/api/medicos').subscribe(
      response => this.medicos = response,
      error => console.log(error)
    );
  }

}
