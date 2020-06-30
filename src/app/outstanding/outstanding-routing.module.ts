import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeliveryPaymentReportComponent } from "./delivery-payment-report/delivery-payment-report.component";

const routes: Routes = [
  {
    path: "sell-report",
    component: DeliveryPaymentReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutstandingRoutingModule {}
