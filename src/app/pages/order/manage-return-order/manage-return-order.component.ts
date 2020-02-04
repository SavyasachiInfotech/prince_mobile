import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-manage-return-order",
  templateUrl: "./manage-return-order.component.html",
  styleUrls: ["./manage-return-order.component.scss"]
})
export class ManageReturnOrderComponent implements OnInit {
  public currentPage: number = 1;
  public lastPage: number = 0;
  public displayPages: number[] = new Array();
  public orders = new Array();
  public imageBaseUrl = this._config.returnBaseUrl;

  constructor(private _orderService: OrderService, private _config: Config) {}

  ngOnInit() {
    this.getReturnRequests();
    this.imageBaseUrl = this._config.returnBaseUrl;
  }

  getReturnRequests() {
    let data = { pageno: this.currentPage - 1 };
    this._orderService.getReturnRequestedOrder(data).subscribe(
      res => {
        console.log(res);
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.orders = res.data;
          //@ts-ignore
          this.lastPage = Math.ceil(res.count / this._config.displayLimit);
          this.setPagination();
        } else {
          //@ts-ignore
          this._config.showMessage(res.message);
        }
      },
      err => {
        this._config.showMessage("No Request for return found.");
      }
    );
  }

  acceptRequest(order, i) {}

  changePage(pageno) {}

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
}
