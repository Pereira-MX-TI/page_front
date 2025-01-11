import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalStorageService } from '../../services/local-storage.service';
import { WindowSizeService } from '../../services/window-size.service';
import { HttpService } from '../../services/http.service';

import { TableComponent } from './components/table/table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MessageEmptyComponent } from './components/message-empty/message-empty.component';
@NgModule({
  declarations: [TableComponent, MessageEmptyComponent],
  exports: [TableComponent, MessageEmptyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    TableVirtualScrollModule,
  ],
  providers: [HttpService, LocalStorageService, WindowSizeService],
})
export class SharedModule {}
