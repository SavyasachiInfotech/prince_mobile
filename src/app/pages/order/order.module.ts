import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { ManageOrderComponent } from "./manage-order/manage-order.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { ManageReturnOrderComponent } from "./manage-return-order/manage-return-order.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ManageOrderComponent,
    OrderDetailComponent,
    ManageReturnOrderComponent
  ],
  imports: [CommonModule, OrderRoutingModule, FormsModule]
})
export class OrderModule {}
