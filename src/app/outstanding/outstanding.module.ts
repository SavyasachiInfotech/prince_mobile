import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutstandingRoutingModule } from './outstanding-routing.module';
import { DeliveryPaymentReportComponent } from './delivery-payment-report/delivery-payment-report.component';


@NgModule({
  declarations: [DeliveryPaymentReportComponent],
  imports: [
    CommonModule,
    OutstandingRoutingModule
  ]
})
export class OutstandingModule { }
