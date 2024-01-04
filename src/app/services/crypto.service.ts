import { Injectable } from '@angular/core';
import  * as CryptoJS from "crypto-js";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {


  constructor() { }

  decrypted(data:string):any
  {
    let bytes = CryptoJS.AES.decrypt(data,environment.KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  encrypted(data:any):any
  {
    return CryptoJS.AES.encrypt(JSON.stringify(data),environment.KEY).toString();
  }
}
