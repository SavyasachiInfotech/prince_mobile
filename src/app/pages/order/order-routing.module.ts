import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageOrderComponent } from "./manage-order/manage-order.component";

const routes: Routes = [
  {
    path: "manage-order",
    component: ManageOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
