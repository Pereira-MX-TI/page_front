import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CryptoService } from 'src/app/services/crypto.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Injectable({
  providedIn: 'root'
})
export class ViewServiceGuard  {

  constructor(
    private objCryptoService:CryptoService,
    private objNavegationService:NavegationService)
    {}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(route.params.data == undefined)
      {
        this.objNavegationService.navegatePage("Service/List");
        return false;
      }
      let data:any = route.params.data;
      if(data.length < 30)
      {
        this.objNavegationService.navegatePage("Service/List");
        return false;
      }

      data = this.objCryptoService.decrypted(atob(data.replace(new RegExp("~","g") ,"/")));
      if(data.service == undefined)
      {
        this.objNavegationService.navegatePage("Service/List");
        return false;
      }
      
      return true;
  }
  
}
