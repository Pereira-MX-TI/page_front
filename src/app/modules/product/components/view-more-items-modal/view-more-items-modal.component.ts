import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filter } from '../../models/filter.model';
import { SlicePipe } from '@angular/common';
import { MaterialComponents } from '../../../material/material.module';

@Component({
  selector: 'app-view-more-items-modal',
  standalone: true,
  imports: [SlicePipe, MaterialComponents],
  templateUrl: './view-more-items-modal.component.html',
  styleUrls: ['./view-more-items-modal.component.css'],
})
export class ViewMoreItemsModalComponent {
  listItems: Filter[] = [];
  title: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataModal: { list: Filter[]; title: string },
    private dialogRef: MatDialogRef<ViewMoreItemsModalComponent>
  ) {
    this.listItems = dataModal.list;
    this.title = dataModal.title;
  }

  sendData(res: Filter): void {
    this.dialogRef.close(res);
  }
}
