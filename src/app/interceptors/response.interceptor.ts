import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CryptoService } from '../services/crypto.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private cryptoService: CryptoService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body && event.body.data) {
          const decryptedData = this.cryptoService.decrypted(event.body.data);
          return event.clone({
            body: { ...event.body, ...decryptedData },
          });
        }
        return event;
      })
    );
  }
}
