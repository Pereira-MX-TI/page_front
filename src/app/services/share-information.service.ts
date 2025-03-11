import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareInformationService {
  search$: EventEmitter<string> = new EventEmitter<string>();
  sideNav$: EventEmitter<void> = new EventEmitter<void>();
}
