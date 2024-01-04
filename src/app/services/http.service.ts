import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CryptoService } from './crypto.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  versionApi:string;
  HEADERS:HttpHeaders;
 
  //php artisan serve --host=192.168.1.9 --port=9000
  //ng serve --port 4500 --host=192.168.1.9
  //chrome://inspect/#devices

  //http://127.0.0.1:8000
  //https://pageserver.solucionesjmpf.com
  constructor(
  private objHttp:HttpClient,
  private objCryptoService:CryptoService,
  private objLocalStorageService:LocalStorageService) 
  { 
    this.versionApi = "v1/";
  }

  getHeaders(opc:number):void
  {
    switch(opc)
    {
      case 0:
      {  
        this.HEADERS = new HttpHeaders({
          'Content-Type':'application/json',
          'Accept':'application/json'
        });
      }break;

      case 1:
      {
        let currentAccount = {
          token:environment.TOKEN,
          user:{
            id: 2,
            name: "Visitante web",
            email: "visit@visit.com",
            type_user:{
              id: 4,
              type_user_name: "Visitante"
            }
          }
        };
  
        this.HEADERS = new HttpHeaders({
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':'Bearer '+this.objCryptoService.decrypted(currentAccount.token),
          'datatoken':currentAccount.token
        });
      }break;
    }
  }

  getLogin(data:any):Observable<any>
  {
    this.getHeaders(0);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}login`,{headers:this.HEADERS,params: params});
  }

  getListCarousel(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}getListCarousel`,{headers:this.HEADERS,params: params});
  }

  getCarousel(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}getCarousel`,{headers:this.HEADERS,params: params});
  }

  getListProduct(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}getListProduct`,{headers:this.HEADERS,params: params});
  }

  searchListProduct(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}searchListProduct`,{headers:this.HEADERS,params: params});
  }

  autoCompletedProduct(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}autoCompletedProduct`,{headers:this.HEADERS,params: params});
  }

  getProduct(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}getProduct`,{headers:this.HEADERS,params: params});
  }

  getPublicity(data:any):Observable<any>
  {
    this.getHeaders(1);
    let params = new HttpParams();
    params = params.append('data',btoa(this.objCryptoService.encrypted(data)).replace(new RegExp("/","g") ,"~"));
    return this.objHttp.get<any>(`${environment.API_URI}${this.versionApi}getPublicity`,{headers:this.HEADERS,params: params});
  }

  getIpAddress():Observable<any>
  {
    return this.objHttp.get<any>("https://api.ipify.org/?format=json");
  }

  registerQuotationWeb(data:any):Observable<any>
  {
    this.getHeaders(1);
    const body = {data:this.objCryptoService.encrypted(data)};
    return this.objHttp.post<any>(`${environment.API_URI}${this.versionApi}registerQuotationWeb`,body,{headers:this.HEADERS});
  }

  registerInfoServiceWeb(data:any):Observable<any>
  {
    this.getHeaders(1);
    const body = {data:this.objCryptoService.encrypted(data)};
    return this.objHttp.post<any>(`${environment.API_URI}${this.versionApi}registerInfoServiceWeb`,body,{headers:this.HEADERS});
  }
}