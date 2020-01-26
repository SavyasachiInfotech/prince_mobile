import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { AddBannerComponent } from './add-banner/add-banner.component';


@NgModule({
  declarations: [AddBannerComponent],
  imports: [
    CommonModule,
    BannerRoutingModule
  ]
})
export class BannerModule { }
