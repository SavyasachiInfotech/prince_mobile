import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageOrderComponent } from "./manage-order/manage-order.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { ManageReturnOrderComponent } from "./manage-return-order/manage-return-order.component";

const routes: Routes = [
  {
    path: "manage-order",
    component: ManageOrderComponent
  },
  {
    path: "order-detail/:id",
    component: OrderDetailComponent
  },
  {
    path: "manage-return-order",
    component: ManageReturnOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
