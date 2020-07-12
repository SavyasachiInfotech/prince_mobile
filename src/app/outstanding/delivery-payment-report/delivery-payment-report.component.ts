import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-delivery-payment-report",
  templateUrl: "./delivery-payment-report.component.html",
  styleUrls: ["./delivery-payment-report.component.scss"]
})
export class DeliveryPaymentReportComponent implements OnInit {
  constructor(private _orderService: OrderService, private _config: Config) {}
  public orders = new Array();
  public totalCodAmount = 0;
  public totalPaytmAmount = 0;
  public totalDeliveryCharge = 0;
  public totalCollection = 0;
  public totalCodOrders = 0;
  public totalPaytmOrders = 0;
  public reportTitle = "";

  ngOnInit() {
    let title = this._config.orderStatus[localStorage.getItem("orderStatus")];
    this.reportTitle = title + " Report";
    this._orderService
      .getSellReportData({
        status: localStorage.getItem("orderStatus"),
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
          this.totalCodOrders++;
        } else {
          this.totalPaytmAmount += order.order_amount;
          this.totalPaytmOrders++;
        }
        this.totalDeliveryCharge += order.deliveryCharge;
      }
      this.totalCollection =
        this.totalCodAmount + this.totalPaytmAmount + this.totalDeliveryCharge;
    }
  }
}
