import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private objRouter:Router) { }

  save(name:string,value:string):void
  {
    localStorage.setItem(name,value);
  }

  view(key:string):string
  {
    let data:string=localStorage.getItem(key);   
    return data;
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
