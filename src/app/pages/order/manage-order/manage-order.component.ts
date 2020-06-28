import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-manage-order",
  templateUrl: "./manage-order.component.html",
  styleUrls: ["./manage-order.component.scss"]
})
export class ManageOrderComponent implements OnInit {
  constructor(private _orderService: OrderService, private _config: Config) {}

  public limit = 0;
  public displayPages: number[] = new Array();
  public currentPage: number = 1;
  public lastPage: number = 1;
  public orders: any[] = new Array();
  public currentStatus: number = 0;
  public startDate = new Date("2020-01-01").toISOString().split("T")[0];
  public endDate = new Date().toISOString().split("T")[0];
  public summary = {
    totalDeliveryCharge: 0,
    codTotal: 0,
    paytmTotal: 0
  };
  public addressClass = [
    "badge badge-primary",
    "badge badge-secondary",
    "badge badge-success",
    "badge badge-dark",
    "badge badge-info",
    "badge badge-warning",
    "badge badge-danger",
    "badge badge-light",
    "badge badge-custom1",
    "badge badge-custom2"
  ];

  ngOnInit() {
    this.limit = this._config.displayLimit;
    this.getOrderByStatus(0);
  }

  getOrderByStatus(status) {
    this.currentStatus = status;
    this.currentPage = 1;
    this.getOrders();
  }

  changeStatus(status, order, i) {
    this._orderService
      .changeStatus({
        status: status,
        order_id: order.order_id,
        user_id: order.user_id,
        address_id: order.address_id
      })
      .subscribe(res => {
        //@ts-ignore
        this._config.showMessage(res.message);
        //@ts-ignore
        if (res.status == 200) {
          this.orders.splice(i, 1);
          if (order.iscod == 1) {
            this.summary.codTotal = this.summary.codTotal - order.order_amount;
            this.summary.totalDeliveryCharge =
              this.summary.totalDeliveryCharge - order.deliveryCharge;
          } else {
            this.summary.paytmTotal =
              this.summary.paytmTotal - order.order_amount;
          }
        }
      });
  }

  acceptRequest(order, i) {
    this._config.showMessage("Return request accepted.");
  }

  setPagination() {
    delete this.displayPages;
    this.displayPages = new Array();
    let startPage;
    if (this.currentPage > 5 && this.currentPage < this.lastPage - 5) {
      startPage = this.currentPage - 5;
      for (let i = 0; i < this.currentPage + 5; i++) {
        this.displayPages.push(startPage);
        startPage = startPage + 1;
      }
    } else {
      if (this.currentPage < 5) {
        for (let i = 0; i < 10; i++) {
          this.displayPages.push(i + 1);
          if (i + 1 == this.lastPage) {
            break;
          }
        }
      } else {
        for (let i = this.lastPage - 10; i <= this.lastPage; i++) {
          if (i > 0) {
            this.displayPages.push(i);
          }
        }
      }
    }
  }

  getOrders() {
    this._orderService
      .getOrdersByStatus({
        status: this.currentStatus,
        pageno: this.currentPage - 1,
        start: this.startDate,
        end: this.endDate
      })
      .subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.lastPage = Math.ceil(res.count / this.limit);
          //@ts-ignore
          this.summary.codTotal = res.codTotal || 0;
          //@ts-ignore
          this.summary.paytmTotal = res.paytmTotal || 0;
          //@ts-ignore
          this.summary.totalDeliveryCharge = res.totalDeliveryCharge || 0;
          //@ts-ignore
          this.orders = res.data;
          let badgeCountBit = 0;
          for (let i = 0; i < this.orders.length; i++) {
            let image = JSON.parse(this.orders[i].thumbnail);
            if (image.length > 0) {
              this.orders[i].thumbnail = this._config.thumbnailUrl + image[0];
            } else {
              this.orders[i].thumbnail = "";
            }
            let data = this.orders.filter(
              order => order.address_id == this.orders[i].address_id
            );
            if (data && this.orders[i].order_id == data[0].order_id) {
              this.orders[i].addressClass = this.addressClass[badgeCountBit];
              if (badgeCountBit == 9) {
                badgeCountBit = 0;
              } else {
                badgeCountBit++;
              }
            } else {
              this.orders[i].addressClass = data[0].addressClass;
            }
          }
          this.setPagination();
        }
      });
  }

  changePage(pageno) {
    this.currentPage = pageno;
    this.getOrders();
  }
}
