import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class SesionStorageService {
  constructor(
    private platform: Platform,
    private cryptoService: CryptoService
  ) {}

  set(name: string, value: any): void {
    if (!this.platform.isBrowser) return;

    sessionStorage.setItem(name, this.cryptoService.encrypted(value));
  }

  get(key: string): any {
    if (!this.platform.isBrowser) return '';

    return this.cryptoService.decrypted(sessionStorage.getItem(key));
  }

  exist(key: string): boolean {
    if (!this.platform.isBrowser) return false;

    return sessionStorage.getItem(key) != undefined;
  }

  remove(lisKey: Array<string>): void {
    if (!this.platform.isBrowser) return;

    lisKey.forEach((itrKey) => {
      sessionStorage.removeItem(itrKey);
    });
  }

  removeAll(): void {
    if (!this.platform.isBrowser) return;

    sessionStorage.clear();
  }
}
