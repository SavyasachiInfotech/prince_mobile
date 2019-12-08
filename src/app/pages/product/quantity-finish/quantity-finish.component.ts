import { Component, OnInit } from "@angular/core";
import { VariantService } from "src/app/core/mock/variant.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-quantity-finish",
  templateUrl: "./quantity-finish.component.html",
  styleUrls: ["./quantity-finish.component.scss"]
})
export class QuantityFinishComponent implements OnInit {
  constructor(
    private _variantService: VariantService,
    private _config: Config
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
        this.variants = res.data;
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
}
