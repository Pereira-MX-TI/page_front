import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { ShareInformationService } from '@core/services';
import { customErrorStateMatcher } from '../../../../customErrorStateMatcher';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent implements OnInit, OnDestroy {
  viewError: boolean;
  listMessage: Array<string>;
  case: number;
  matcher: customErrorStateMatcher;

  formControl: UntypedFormControl;
  listObservable: any;
  listSubscription: Subscription[];
  message: string;

  constructor(
    private objSnackBar: MatSnackBar,
    protected objShareInformationService: ShareInformationService,
    private dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.case = this.data['opcView'];
    this.matcher = new customErrorStateMatcher();
    this.listSubscription = [
      new Subscription(),
      new Subscription(),
      new Subscription(),
    ];

    switch (this.case) {
      case 0:
        {
          this.listMessage = this.data['listMessage'];
        }
        break;

      case 1:
        {
          this.formControl = new UntypedFormControl();
          this.formControl.setValue('');
          this.listObservable = [];
        }
        break;

      case 3:
        {
          this.message = this.data['message'];
        }
        break;
    }
  }

  ngOnInit(): void {
    this.listSubscription[1] =
      this.objShareInformationService.search2$.subscribe(
        (response: string[]) => {
          this.listObservable = response;
        },
      );
  }

  ngOnDestroy() {
    this.listSubscription.forEach((itrSub) => {
      itrSub.unsubscribe();
    });
  }

  autoCompleted(): void {
    if (this.formControl.value == '') this.listObservable = [];
    else {
      this.objShareInformationService.search1$.emit(this.formControl.value);
    }
  }

  setResponse(): void {
    switch (this.case) {
      case 0:
        {
          this.dialogRef.close(true);
        }
        break;

      case 1:
        {
          if (this.formControl.value == '') this.listObservable = [];
          else {
            this.objShareInformationService.viewLoading$.emit(true);
            this.objShareInformationService.search3$.emit(
              this.formControl.value,
            );
          }

          this.dialogRef.close();
        }
        break;
    }
  }
}
