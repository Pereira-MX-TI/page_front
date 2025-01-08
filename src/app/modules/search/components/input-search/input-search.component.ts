import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { ShareInformationService } from 'src/app/services/share-information.service';

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

  listObservable: string[] = [];
  listSubscription: Subscription[] = [];
  formControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private httpService: HttpService,
    private shareInformationService: ShareInformationService
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
        if (!value) this.listObservable = [];
        else if (value.trim() != '') {
          this.httpService
            .autoCompletedProduct({
              word: value,
            })
            .subscribe(({ data }) => {
              // const {
              //   data: { list },
              // }: any = this.cryptoService.decrypted(data);
              // this.listObservable = Object.values(list);
            });
        } else this.listObservable = [];
      });
  }

  applySearch(): void {
    if (this.formControl.invalid) return;
    this.shareInformationService.search$.emit(this.formControl.value.trim());
  }
}
