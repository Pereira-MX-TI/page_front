import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any 
  {
    let urlServer = "https://pageserver.solucionesjmpf.com/";
    let response:string = "-";

    switch(args[0])
    {
      case 0:
      {
        let data:any=value;    
        switch(args[1])
        {
          case 'id':response = data.id; break;
          case 'name':response = data.nombre; break;
          case 'material':response = data.material.nombre; break;
          case 'brand':response = data.brand.nombre; break;
          case 'descriptionL':response = (data.description.detalle.substring(0, 150))+' ...'; break;
          case 'descriptionC':response = data.description.detalle; break;

          case 'image1':
          {
            response = './../../../../assets/default.jpg';

            if(data.product!=undefined)
              data=data.product;
              
            if(data.files.length !=0)
              if(data.files[0].direccion.includes('image'))
                 response = urlServer+data.files[0].direccion;
          }break;

          case 'image2':
          {
              response = urlServer+data.direccion;
          }break;

          case 'cardName':
          {  
            if(data.product!=undefined)
              data=data.product;
            
            response = (data.nombre.substring(0, 50))+' ...';
          }break;
        }
      }break;
    }
    return response;
  }

}
