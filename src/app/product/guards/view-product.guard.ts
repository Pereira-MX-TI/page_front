import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { CryptoService } from '../../services/crypto/crypto.service'
import { NavegationService } from '@services/navegation/navegation.service'

@Injectable({
  providedIn: 'root',
})
export class ViewProductGuard {
  constructor(
    private objCryptoService: CryptoService,
    private objNavegationService: NavegationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.params.data == undefined) {
      this.objNavegationService.navegatePage('Product/List')
      return false
    }

    let data: any = route.params.data
    if (data.length < 30) {
      this.objNavegationService.navegatePage('Product/List')
      return false
    }

    data = this.objCryptoService.decrypted(
      atob(data.replace(new RegExp('~', 'g'), '/')),
    )
    if (data.id == undefined) {
      this.objNavegationService.navegatePage('Product/List')
      return false
    }

    return true
  }
}
