import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoService } from './crypto.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
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

    return this.httpClient.get<any>(
      `${environment.API_URI}carousel/specificCarousel`,
      {
        params,
      }
    );
  }

  autoCompletedProduct(dto: string): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted({ word: dto })).replace(
        new RegExp('/', 'g'),
        '~'
      )
    );

    return this.httpClient.get<any>(
      `${environment.API_URI}product/autoCompletedProduct`,
      {
        params,
      }
    );
  }

  listProduct(dto: {
    word: string;
    totalRecords: number;
    offset: number;
    limit: number;
    orderby: string;
  }): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(dto)).replace(new RegExp('/', 'g'), '~')
    );

    return this.httpClient.get<any>(
      `${environment.API_URI}product/listProduct`,
      {
        params,
      }
    );
  }

  filtersProduct(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URI}product/filtersProduct`
    );
  }

  waterMeterCarousel(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URI}carousel/waterMeterCarousel`
    );
  }

  detailProduct(dto: {
    id: number | string;
    publicity: number | string;
  }): Observable<any> {
    let params = new HttpParams();
    params = params.append(
      'data',
      btoa(this.cryptoService.encrypted(dto)).replace(new RegExp('/', 'g'), '~')
    );

    return this.httpClient.get<any>(
      `${environment.API_URI}product/detailProduct`,
      {
        params,
      }
    );
  }

  getIpAddress(): Observable<any> {
    return this.httpClient.get<any>('https://api.ipify.org/?format=json');
  }
}
