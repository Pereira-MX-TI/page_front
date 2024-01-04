import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavegationService } from 'src/app/services/navegation.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.css']
})
export class HelpMenuComponent implements OnInit {

  menuList:any[];
  constructor(
    private objRouter:Router,
    private renderer:Renderer2,
    public objNavegationService:NavegationService,
    private objHttpService:HttpService,
    private objLocalStorageService:LocalStorageService,
    private objWindowSizeService:WindowSizeService) 
    {
      this.menuList = [
        {title:"Conocer el medidor de agua que necesito",link:""},
        {title:"Preguntas frecuentes",link:""},
        {title:"Cotizar",link:""},
        {title:"Comprar",link:""},
        {title:"Envios",link:""},
        {title:"Facturar",link:""},
        {title:"Terminos y condiciones",link:""}
      ];
      
    }
  ngOnInit(): void {
  }

  help(opc:number):void
  {
  }

  ngAfterViewInit() 
  {
    setTimeout(() => this.objNavegationService.currentSelectMenu(this.objRouter.url), 100);
  }

}
