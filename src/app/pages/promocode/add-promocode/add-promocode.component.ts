import { Component, OnInit } from "@angular/core";
import { PromocodeService } from "src/app/core/mock/promocode.service";
import { Config } from "src/app/core/data/config";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-promocode",
  templateUrl: "./add-promocode.component.html",
  styleUrls: ["./add-promocode.component.scss"]
})
export class AddPromocodeComponent implements OnInit {
  public promocode: any = {
    code: "",
    description: "",
    discount: 0,
    min_limit: 0,
    max_discount: 0,
    discount_type: 1,
    max_attempt: 0
  };
  constructor(
    private _promocodeService: PromocodeService,
    private _config: Config,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.cancelPromocode();
    this.promocode.id = 0;
    this._route.params.subscribe(data => {
      if (data.id) {
        if (data.id != 0) {
          this._promocodeService.getPromocodeById(data.id).subscribe(res => {
            //@ts-ignore
            if (res.status == 200) {
              //@ts-ignore
              this.promocode = res.data[0];
            }
          });
        }
      }
    });
  }

  cancelPromocode() {
    this.promocode = {
      code: "",
      description: "",
      discount: 0,
      min_limit: 0,
      max_discount: 0,
      discount_type: 1,
      max_attempt: 0
    };
  }

  savePromocode() {
    if (this.promocode.discount_type == 1) {
      this.promocode.max_discount = this.promocode.discount;
      this.promocode.min_limit=this.promocode.discount;
    }
    if (this.promocode.id > 0) {
      this._promocodeService.updatePromocode(this.promocode).subscribe(res => {
        //@ts-ignore
        this._config.showMessage(res.message);
        //@ts-ignore
        if (res.status == 200) {
          this._router.navigate(["dashboard/promocode/manage-promocode"]);
        }
      });
    } else {
      this._promocodeService.addPromocode(this.promocode).subscribe(res => {
        //@ts-ignore
        this._config.showMessage(res.message);
        //@ts-ignore
        if (res.status == 200) {
          this._router.navigate(["dashboard/promocode/manage-promocode"]);
        }
      });
    }
  }
}
