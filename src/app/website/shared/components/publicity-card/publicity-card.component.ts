import { Component, OnInit } from '@angular/core';

import { NavegationService } from '@core/services';

@Component({
  selector: 'publicity-card',
  templateUrl: './publicity-card.component.html',
  styleUrls: ['./publicity-card.component.css'],
})
export class PublicityCardComponent implements OnInit {
  listPount: String[];
  constructor(public objNavegationService: NavegationService) {
    this.listPount = [
      'Reduce costos de manera significativa.',
      'Toma de lectura diaria.',
      'Detecta posibles fugas, fraude y retornos de agua.',
      'Visualiza la informacion en todos tus dispositivos.',
    ];
  }

  ngOnInit(): void {}
}
