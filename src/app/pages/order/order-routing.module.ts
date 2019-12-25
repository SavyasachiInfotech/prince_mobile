import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageOrderComponent } from "./manage-order/manage-order.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

const routes: Routes = [
  {
    path: "manage-order",
    component: ManageOrderComponent
  },
  {
    path: "order-detail/:id",
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
