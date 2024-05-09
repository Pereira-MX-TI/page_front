import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  decrypted(data: string): any {
    let bytes = CryptoJS.AES.decrypt(data, environment.KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  encrypted(data: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      environment.KEY,
    ).toString();
  }
}
