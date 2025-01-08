import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoService } from './crypto.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private objHttp: HttpClient,
    private cryptoService: CryptoService
  ) {}

  specificCarousel(dto: string): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted({ type: dto })).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );

    return this.objHttp.get<any>(
      `${environment.API_URI}common/specificCarousel`,
      {
        params,
      }
    );
  }

  autoCompletedProduct(data: { word: string }): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(data)).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );
    return this.objHttp.get<any>(
      `${environment.API_URI}common/autoCompletedProduct`,
      {
        params,
      }
    );
  }

  getCarousel(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(data)).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );
    return this.objHttp.get<any>(`${environment.API_URI}common/getCarousel`, {
      params,
    });
  }

  getListProduct(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(data)).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );
    return this.objHttp.get<any>(
      `${environment.API_URI}common/getListProduct`,
      {
        params,
      }
    );
  }

  searchListProduct(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(data)).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );
    return this.objHttp.get<any>(
      `${environment.API_URI}common/searchListProduct`,
      {
        params,
      }
    );
  }

  getProduct(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(data)).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );
    return this.objHttp.get<any>(`${environment.API_URI}common/getProduct`, {
      params,
    });
  }

  getPublicity(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(data)).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );
    return this.objHttp.get<any>(`${environment.API_URI}common/getPublicity`, {
      params,
    });
  }

  getIpAddress(): Observable<any> {
    return this.objHttp.get<any>('https://api.ipify.org/?format=json');
  }

  registerQuotationWeb(data: any): Observable<any> {
    const body = { data: this.cryptoService.encrypted(data) };
    return this.objHttp.post<any>(
      `${environment.API_URI}common/registerQuotationWeb`,
      body
    );
  }

  registerInfoServiceWeb(data: any): Observable<any> {
    const body = { data: this.cryptoService.encrypted(data) };
    return this.objHttp.post<any>(
      `${environment.API_URI}common/registerInfoServiceWeb`,
      body
    );
  }
}
