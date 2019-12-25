import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [ManageOrderComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
