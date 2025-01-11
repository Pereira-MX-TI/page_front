import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareDataSearchService {
  close$: EventEmitter<void> = new EventEmitter<void>();
}
