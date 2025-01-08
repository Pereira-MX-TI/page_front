import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectOptionNav } from '../models/select_option_nav.model';

@Injectable({
  providedIn: 'root',
})
export class SelectOptionNavObservable {
  private dataSubject = new BehaviorSubject<SelectOptionNav | null>(null);
  data$ = this.dataSubject.asObservable();

  updateData(data: SelectOptionNav | null): void {
    this.dataSubject.next(data);
  }
}
