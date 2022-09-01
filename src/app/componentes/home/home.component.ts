import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // definir uma propriedade
  tituloHome: string = 'Bem-vindo ao projeto Angular FullStack (back-end - simulado)'

}
