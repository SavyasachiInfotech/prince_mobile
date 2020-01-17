import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderInvoiceComponent } from "./order-invoice/order-invoice.component";

const routes: Routes = [
  {
    path: "/:id",
    component: OrderInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
