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

  ngOnInit() {
    this.limit = this._config.displayLimit;
    this.getOrderByStatus(0);
  }

  getOrderByStatus(status) {
    this.currentStatus = status;
    this._orderService
      .getOrdersByStatus({ status: status, pageno: this.currentPage - 1 })
      .subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.lastPage = Math.ceil(res.count / this.limit);
          //@ts-ignore
          this.orders = res.data;
          for (let i = 0; i < this.orders.length; i++) {
            let image = JSON.parse(this.orders[i].thumbnail);
            if (image.length > 0) {
              this.orders[i].thumbnail = this._config.thumbnailUrl + image[0];
            } else {
              this.orders[i].thumbnail = "";
            }
          }
          this.setPagination();
        }
      });
  }

  changeStatus(status, order, i) {
    this._orderService
      .changeStatus({
        status: status,
        order_id: order.order_id,
        user_id: order.user_id
      })
      .subscribe(res => {
        //@ts-ignore
        this._config.showMessage(res.message);
        //@ts-ignore
        if (res.status == 200) {
          this.orders.splice(i, 1);
        }
      });
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

  changePage(pageno) {
    this.currentPage = pageno;
    this.getOrderByStatus(this.currentStatus);
  }
}
