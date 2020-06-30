import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";

@Component({
  selector: "app-delivery-payment-report",
  templateUrl: "./delivery-payment-report.component.html",
  styleUrls: ["./delivery-payment-report.component.scss"]
})
export class DeliveryPaymentReportComponent implements OnInit {
  constructor(private _orderService: OrderService) {}

  ngOnInit() {
    this._orderService
      .getOrdersByStatus({
        status: 7,
        pageno: 1,
        start: localStorage.getItem("deliveryStartDate"),
        end: localStorage.getItem("deliveryEndDate")
      })
      .subscribe(res => {
        console.log(res);
      });
  }
}
