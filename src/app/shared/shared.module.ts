import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { MessagePipe } from './pipe/message.pipe';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { LocalStorageService } from '../services/local-storage.service';
import { WindowSizeService } from '../services/window-size.service';
import { HttpService } from '../services/http.service';
import { MessageEmptyComponent } from './components/message-empty/message-empty.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
// import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SlickCarouselModule } from "node_modules/ngx-slick-carousel";
import { CarouselComponent } from './components/carousel_images/carousel_images.component';
import { CarouselCardsComponent } from './components/carousel-cards/carousel-cards.component';
import { PublicityCardComponent } from './components/publicity-card/publicity-card.component';

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
        PublicityCardComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        // MatCarouselModule.forRoot(),
        SlickCarouselModule
    ],
    providers: [
        HttpService,
        LocalStorageService,
        WindowSizeService
    ]
})
export class SharedModule { }
