import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-invoice",
  templateUrl: "./order-invoice.component.html",
  styleUrls: ["./order-invoice.component.scss"]
})
export class OrderInvoiceComponent implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute
  ) {}

  public invoice_id = 0;
  public order: any = {};
  public orderDetails = new Array();

  ngOnInit() {
    this._route.params.subscribe(data => {
      this.invoice_id = data.id;
      this._orderService
        .getOrderDetail({ order_id: this.invoice_id })
        .subscribe(res => {
          //@ts-ignore
          if (res.status == 200) {
            //@ts-ignore
            this.order = res.order[0];
            //@ts-ignore
            this.orderDetails = res.order_detail;
            for (let i = 0; i < this.orderDetails.length; i++) {
              let product = JSON.parse(this.orderDetails[i].variant);
              console.log(product);
              this.orderDetails[i].name = product.name;
              this.orderDetails[i].attributes = product.attributes;
              this.orderDetails[i].discount = product.discount;
              this.orderDetails[i].price =
                product.price -
                (product.price * product.tax) / (100 + product.tax);
              this.orderDetails[i].quantity = product.cart_quantity;
              this.orderDetails[i].total =
                this.orderDetails[i].price * this.orderDetails[i].quantity;
              if (i == 0) {
                this.order.gst =
                  (this.order.order_amount * product.tax) / (100 + product.tax);
                this.order.taxable_amount =
                  this.order.order_amount - this.order.gst;
                this.order.totalWithTax =
                  this.order.gst + this.order.taxable_value;
                this.order.totalWithTax = this.order.totalWithTax.toFixed(2);
                this.order.gst = this.order.gst.toFixed(2);
                this.order.taxable_amount = this.order.taxable_amount.toFixed(
                  2
                );
              }

              this.orderDetails[i].price = this.orderDetails[i].price.toFixed(
                2
              );
              this.orderDetails[i].total = this.orderDetails[i].total.toFixed(
                2
              );
            }
            this.order.discount = 0.0;
            //@ts-ignore
            if (res.promocode && res.promocode.length > 0) {
              //@ts-ignore
              let promo = res.promocode;
              if (promo[0].discount_type == 1) {
                if (this.order.taxable_value >= promo[0].max_discount) {
                  this.order.discount = promo[0].discount;
                } else {
                  this.order.discount = this.order.order_amount;
                }
              } else {
                this.order.discount =
                  this.order.order_amount * promo[0].discount;
              }
              this.order.discount = this.order.discount.toFixed(0);
            }
          }
        });
    });
  }
}
