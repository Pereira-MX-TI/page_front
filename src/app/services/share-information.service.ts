import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareInformationService {
  viewLoading$: EventEmitter<boolean> = new EventEmitter<boolean>();
  search$: EventEmitter<string> = new EventEmitter<string>();
  sideNav$: EventEmitter<void> = new EventEmitter<void>();
}
