import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrderService } from "src/app/core/mock/order.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit {
  public orderCount = 0;
  public quantityFinish = 0;
  constructor(private _router: Router, private _orderService: OrderService) {}

  ngOnInit() {
    this.getFinishCount();
    setInterval(() => {
      this.getFinishCount();
    }, 600000);
  }

  getFinishCount() {
    this._orderService.recievedOrderCount().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        if (res.data.length > 0) {
          //@ts-ignore
          this.orderCount = res.data[0].count;
        }
        //@ts-ignore
        if (res.quantity.length > 0) {
          //@ts-ignore
          this.quantityFinish = res.quantity[0].count;
        }
      }
    });
  }

  goToLink(link) {
    this._router.navigate(["dashboard/" + link]);
  }

  logout() {
    localStorage.clear();
    this._router.navigate([""]);
  }
}
