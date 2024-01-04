import { Injectable } from '@angular/core';
import { Router} from "@angular/router";
import { CryptoService } from './crypto.service';
import { LocalStorageService } from './local-storage.service';
import { ShareInformationService } from './share-information.service';
import { WindowSizeService } from './window-size.service';

@Injectable({
  providedIn: 'root'
})
export class NavegationService {

  constructor(  
  private objRouter:Router,
  private objWindowSizeService:WindowSizeService,
  private objCryptoService:CryptoService,
  private objLocalStorageService:LocalStorageService,
  private objShareInformationService:ShareInformationService)
  {}

  navegatePage(urlCurrent:string):void
  {
    this.objRouter.navigate([urlCurrent]);  
  }

  listSelectMenu(urlCurrent:string):any
  {
    let listOption:boolean[]=[false,false,false,false,false,false,false];
    let tabNavBar:any = [0,"",""];

    urlCurrent = urlCurrent.includes("/Product/View")?"/Product/View":urlCurrent;
    urlCurrent = urlCurrent.includes("/Service/View")?"/Service/View":urlCurrent;

    switch(urlCurrent)
    {
      case "/":
      {
          listOption[0] = true;
      }break;

      case "/Home":
      {
        listOption[0] = true;
      }break;

      case "/Product/List":
      {
        listOption[1] = true;
      }break;

      case "/Product/View":
      {
        listOption[1] = true;
      }break;

      case "/Product/ShoppingCar":
      {
          listOption[1] = true;
      }break;

      case "/Service/List":
      {
          listOption[2] = true;
      }break;

      case "/Service/View":
      {
          listOption[2] = true;
      }break;

      case "/Offers":
      {
        listOption[3] = true;
      }break;

      case "/Quotation":
      {
        listOption[4] = true;
      }break;

      case "/Contact":
      {
        listOption[5] = true;
      }break;

      case "/AboutUs":
      {
        listOption[6] = true;
      }break;

      case "/Help":
      {
        listOption[7] = true;
      }break;
    }

    return [listOption,tabNavBar];
  }

  currentSelectMenu(urlCurrent:string):void
  {
    let response:any = this.listSelectMenu(urlCurrent);   

    this.objShareInformationService.selectMenuMovil$.emit(response[0]);
    this.objShareInformationService.viewTabNavBar$.emit(response[1]);
  }

  viewSideNav(viewSideNav:boolean):void
  {
    this.objShareInformationService.viewSideNav$.emit(viewSideNav);
  }

  validateToken(response:number):boolean
  {
    if(response==401)
    {
      this.objRouter.navigate(["/Home"]); 
      return false;
    }
      
    return true;
  }

  setPositionScrooll(position:number):void
  {
    if(position==0)
    {
      document.body.scrollTop = 0; // Safari
      document.documentElement.scrollTop = 0;
    }
    else
    {
      document.body.scrollTop += position; // Safari
      document.documentElement.scrollTop += position;
    }
  }

  getPositionScrooll():number
  {
    let position:number = document.body.scrollTop;
    position =  document.documentElement.scrollTop;
    return position;
  }
}