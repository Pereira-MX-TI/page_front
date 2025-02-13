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

  set(name: string, time: number, type: 'min' | 'hr', data: any) {
    let expirationInDays = 0; // Debe ser un número

    if (type === 'hr') expirationInDays = time / 24;
    else if (type === 'min') expirationInDays = time / 1440;

    this.cookieService.set(name, data, expirationInDays, '/');
  }

  get(name: string): any {
    const cookieValue = this.cookieService.get(name);

    if (cookieValue) return cookieValue;

    return null;
  }
}
