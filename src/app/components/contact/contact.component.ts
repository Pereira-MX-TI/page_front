import { Component, OnInit,AfterViewInit,Renderer2, OnDestroy} from '@angular/core';
import { HttpService } from "../../services/http.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { WindowSizeService } from "../../services/window-size.service";

import { NavegationService } from 'src/app/services/navegation.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoService } from 'src/app/services/crypto.service';
import { Subscription } from 'rxjs';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,AfterViewInit,OnDestroy  {

  listSubscription:Subscription[];

  constructor(
    private objRouter:Router,
    private title: Title, private meta: Meta,
    private objSnackBar: MatSnackBar,
    private objHttpService:HttpService,
    private objLocalStorageService:LocalStorageService,
    private objCryptoService:CryptoService,
    private objShareInformationService:ShareInformationService,
    private objWindowSizeService:WindowSizeService,
    public  objNavegationService:NavegationService)
  {
    this.listSubscription = [new Subscription,new Subscription];
  }

  ngOnInit(): void 
  {
    this.title.setTitle('SCHP | Contacto');
    this.meta.updateTag({name: "title", content: "Medidores de agua"});
    this.meta.updateTag({name: "description", content: "medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua"});
    this.meta.updateTag({name: "keywords", content: "medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua"});
    this.meta.updateTag({name: "site", content: "https://solucionesjmpf.com"});
    
    this.listSubscription[1] = this.objShareInformationService.search3$.subscribe((response:string)=>{
      this.objLocalStorageService.save('selpro',this.objCryptoService.encrypted(response));
      this.objNavegationService.navegatePage("Product/List");
    });
  }

  ngOnDestroy()
  {
    this.listSubscription.forEach(itrSub => { itrSub.unsubscribe();});
  }

  ngAfterViewInit() 
  {
    setTimeout(() => this.objNavegationService.currentSelectMenu(this.objRouter.url), 100);
  }
}
