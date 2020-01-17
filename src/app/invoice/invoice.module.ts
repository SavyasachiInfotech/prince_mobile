import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';


@NgModule({
  declarations: [OrderInvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
