import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'message'
})
export class MessagePipe implements PipeTransform {

  constructor(){}

  transform(value: any, ...args: any[]): any 
  {
    let response:any;

    switch(args[0])
    {
      case 0:
      {
        let date:Date= new Date(value); 
        let listDays=Array<string>("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");   
        let listMonthes=Array<string>("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Nomviembre","Diciembre");

        response=listDays[date.getDay()]+' '+date.getDate()+' de '+listMonthes[date.getMonth()]+' '+date.getFullYear();
      }break;

      case 2:
      {
          let startDay:Date = value["start"]; 
          let endDay:Date = value["end"]; 

          response={startDay: (startDay.getFullYear()+'-'+startDay.getMonth()+"-"+startDay.getDay()),
                    endDay: (endDay.getFullYear()+'-'+endDay.getMonth()+"-"+endDay.getDay())}; 
      }break;
    }
    return response;
  }

}
