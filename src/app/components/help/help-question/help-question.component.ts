import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-question',
  templateUrl: './help-question.component.html',
  styleUrls: ['./help-question.component.css']
})
export class HelpQuestionComponent implements OnInit {

  listQuestions:any;
  constructor() 
  {
    this.listQuestions=["¿Cual es la diferencia entre un medidor de clase metrologica B y C?",
    "¿Mi medidor a que clase de tuberías puede ser conectado?",
    "¿Que clase de documentos me entregan con el medidor?",
    "¿Que norma aplica para estos medidores?",
    "El agua contiene mucho sarro,¿Que tipo de medidor debo comprar?",
    "¿El medidor se puede instalar en cualquier posición?",
    "¿Como puedo leer la medicion de mi medidor?",
    "¿Un medidor de plástico es tan bueno como uno de metal?"];
  }

  ngOnInit(): void {
  }

}
