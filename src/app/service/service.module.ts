import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ListServiceComponent } from './components/list-service/list-service.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
    declarations: [
        ListServiceComponent,
        ViewServiceComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        FormsModule,
        ServiceRoutingModule,
        NgxCaptchaModule
    ]
})
export class ServiceModule { }
