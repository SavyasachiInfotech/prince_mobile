import { Component, OnInit } from "@angular/core";
import { VariantService } from "src/app/core/mock/variant.service";
import { Config } from "src/app/core/data/config";
import { Router } from "@angular/router";

@Component({
  selector: "app-quantity-finish",
  templateUrl: "./quantity-finish.component.html",
  styleUrls: ["./quantity-finish.component.scss"]
})
export class QuantityFinishComponent implements OnInit {
  constructor(
    private _variantService: VariantService,
    private _config: Config,
    private _router: Router
  ) {}
  variants = new Array();
  imageBaseUrl = "";
  ngOnInit() {
    this.imageBaseUrl =
      this._config.imageUrl.replace("list-image/", "") + "thumbnail/";
    this._variantService.getFinishedProducts().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.variants = res.mobile_variant;
        for (let i = 0; i < this.variants.length; i++) {
          this.variants[i].thumbnail = JSON.parse(
            this.variants[i].thumbnail
          )[0];
        }
      } else {
        //@ts-ignore
        this._config.showMessage(res.message);
      }
    });
  }

  goToVariant(variant) {
    localStorage.setItem("finishedVariant", variant.variant_id.toString());
    this._router.navigate([
      "dashboard/product/add-variant/" + variant.product_id
    ]);
  }
}
