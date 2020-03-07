import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";
import { ActivatedRoute } from "@angular/router";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute,
    private _config: Config
  ) {}

  public order: any = {};
  public order_details: any[] = new Array();
  public imageBaseUrl = "";

  ngOnInit() {
    this._route.params.subscribe(data => {
      this._orderService.getOrderDetail({ order_id: data.id }).subscribe(
        res => {
          //@ts-ignore
          if (res.status == 200) {
            let result: any = res;
            console.log(result);
            this.order = result.order[0];
            if (this.order.cgst && this.order.cgst > 0) {
              this.order.taxable_value += this.order.cgst;
            }
            if (this.order.cgst && this.order.cgst > 0) {
              this.order.taxable_value += this.order.sgst;
            }
            this.order.taxable_value = parseFloat(
              this.order.taxable_value.toFixed(2)
            );
            if (result.promocode && result.promocode.length > 0) {
              if (result.promocode[0].discount_type == 1) {
                if (
                  this.order.taxable_value >= result.promocode[0].max_discount
                ) {
                  this.order.promo_amount = result.promocode[0].discount;
                } else {
                  this.order.promo_amount = this.order.order_amount;
                }
              } else {
                this.order.promo_amount =
                  this.order.taxable_value * result.promocode[0].discount;
              }
              this.order.promo_amount = this.order.promo_amount.toFixed(0);
              this.order.afterPromoAmount =
                this.order.taxable_value - this.order.promo_amount;
              this.order.promocode = result.promocode[0].code;
              this.order.promocode_desc = result.promocode[0].description;
            } else {
              this.order.promocode = "Promocode not applied.";
              this.order.promocode_desc = "";
              this.order.promo_amount = 0;
            }

            this.order_details = result.order_detail;
            for (let i = 0; i < this.order_details.length; i++) {
              this.order_details[i].variant = JSON.parse(
                this.order_details[i].variant
              );
            }
            this.order.name = this.order_details[0].variant.name;
            console.log(this.order_details);
          } else {
            //@ts-ignore
            this._config.showMessage(res.message);
          }
        },
        err => {
          this._config.showMessage("Order detail not found");
        }
      );
    });
  }
}
