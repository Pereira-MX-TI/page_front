import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ShareDataSearchService } from '../../services/share-data-search.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent implements OnInit, OnDestroy {
  @Input() set word(res: string) {
    if (!res) return;

    this.formControl.setValue(res, { emitEvent: false });
  }

  @Input() colorIcon: string = 'black';

  listWords: string[] = [];
  listSubscription: Subscription[] = [];
  formControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private httpService: HttpService,
    private navigationService: NavigationService,
    private shareDataSearchService: ShareDataSearchService
  ) {
    this.listSubscription = [new Subscription()];
  }

  ngOnInit(): void {
    this.subscriptionFormControl();
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  private subscriptionFormControl(): void {
    this.listSubscription[0] = this.formControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        if (!value || value.trim() === '') {
          this.listWords = [];
          return;
        }

        this.httpService.autoCompletedProduct(value).subscribe(({ data }) => {
          this.listWords = Object.keys(data).map((itr) => data[itr]);
        });
      });
  }

  applySearch(): void {
    if (this.formControl.invalid) return;

    const res: string = this.formControl.value.trim();
    this.navigationService.navigatePage('Productos/Busqueda', { data: res });
    this.shareDataSearchService.close$.emit();
  }
}
