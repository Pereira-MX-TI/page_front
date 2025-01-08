import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class CookieManageService {
  constructor(
    private cookieService: CookieService,
    private cryptoService: CryptoService
  ) {}

  set(time: number, type: 'min' | 'hr', data: any) {
    const currentTime = new Date();

    if (type === 'hr') currentTime.setHours(currentTime.getHours() + time);
    else if (type === 'min')
      currentTime.setMinutes(currentTime.getMinutes() + time);

    this.cookieService.set(
      'check',
      this.cryptoService.encrypted(data),
      currentTime
    );
  }

  get(name: string): any {
    const cookieValue = this.cookieService.get(name);

    if (cookieValue) return this.cryptoService.decrypted(cookieValue);

    return null;
  }
}
