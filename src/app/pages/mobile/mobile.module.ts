import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { AddMobileComponent } from './add-mobile/add-mobile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddMobileComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    FormsModule
  ]
})
export class MobileModule { }
