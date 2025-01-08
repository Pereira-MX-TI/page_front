import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private cryptoService:CryptoService) { }

  save(name:string,value:any):void
  {
    localStorage.setItem(name,this.cryptoService.encrypted(value));
  }

  view(key:string):any
  {
    return this.cryptoService.decrypted(localStorage.getItem(key));
  }

  get(key:string):any
  {
    return localStorage.getItem(key);
  }

  exist(key:string):boolean
  {
    return (localStorage.getItem(key)!=undefined?true:false);
  }

  remove(lisKey:Array<string>):void
  {
    lisKey.forEach(itrKey => {
      localStorage.removeItem(itrKey);
    });
  }

  removeAll():void
  {
    localStorage.clear();
  }

  removeAllLogin():void
  {
    let accountCurrent=this.view("cacc");
    localStorage.clear();
    this.save("cacc",accountCurrent);
  }
}
