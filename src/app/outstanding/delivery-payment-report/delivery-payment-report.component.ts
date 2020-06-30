import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";

@Component({
  selector: "app-delivery-payment-report",
  templateUrl: "./delivery-payment-report.component.html",
  styleUrls: ["./delivery-payment-report.component.scss"]
})
export class DeliveryPaymentReportComponent implements OnInit {
  constructor(private _orderService: OrderService) {}
  public orders = new Array();
  public totalCodAmount = 0;
  public totalPaytmAmount = 0;
  public totalDeliveryCharge = 0;
  public totalCollection = 0;

  ngOnInit() {
    this._orderService
      .getSellReportData({
        status: 4,
        start: localStorage.getItem("deliveryStartDate"),
        end: localStorage.getItem("deliveryEndDate")
      })
      .subscribe(res => {
        console.log(res);
        //@ts-ignore
        this.orders = res.data;
        this.calculateTotal();
      });
  }

  calculateTotal() {
    if (this.orders.length) {
      for (let order of this.orders) {
        if (order.iscod == 1) {
          this.totalCodAmount += order.order_amount;
        } else {
          this.totalPaytmAmount += order.order_amount;
        }
        this.totalDeliveryCharge += order.deliveryCharge;
      }
      this.totalCollection =
        this.totalCodAmount + this.totalPaytmAmount + this.totalDeliveryCharge;
    }
  }
}
