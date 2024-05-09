import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'node_modules/ngx-slick-carousel';

import {
  CarouselCardsComponent,
  CarouselComponent,
  LoadingComponent,
  MessageEmptyComponent,
  ModalDialogComponent,
  PageErrorComponent,
  PublicityCardComponent,
} from '@website/shared/components';
import {
  HttpService,
  LocalStorageService,
  WindowSizeService,
} from '@core/services';
import { MaterialModule } from '@material/material.module';
import { MessagePipe } from '@website/shared/pipe/message.pipe';

// import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    LoadingComponent,
    ModalDialogComponent,
    MessageEmptyComponent,
    MessagePipe,
    PageErrorComponent,
    CarouselComponent,
    CarouselCardsComponent,
    PublicityCardComponent,
  ],
  exports: [
    LoadingComponent,
    ModalDialogComponent,
    MessageEmptyComponent,
    MessagePipe,
    CarouselComponent,
    CarouselCardsComponent,
    PublicityCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // MatCarouselModule.forRoot(),
    SlickCarouselModule,
  ],
  providers: [HttpService, LocalStorageService, WindowSizeService],
})
export class SharedModule {}
