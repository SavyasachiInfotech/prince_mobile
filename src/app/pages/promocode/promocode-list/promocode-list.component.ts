import { Component, OnInit } from "@angular/core";
import { PromocodeService } from "src/app/core/mock/promocode.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-promocode-list",
  templateUrl: "./promocode-list.component.html",
  styleUrls: ["./promocode-list.component.scss"]
})
export class PromocodeListComponent implements OnInit {
  public promocodes: any[] = new Array();
  constructor(
    private _promocodeService: PromocodeService,
    private _config: Config
  ) {}

  ngOnInit() {
    this.getPromocodes();
  }

  getPromocodes() {
    this._promocodeService.getPromocodeList().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.promocodes = res.promocodes;
      }
    });
  }

  deletePromocode(promocode) {
    if (confirm("Are you want to delete Promocode?")) {
      this._promocodeService.deletePromocode(promocode.id).subscribe(res => {
        //@ts-ignore
        this._config.showMessage(res.message);
        //@ts-ignore
        if (res.status == 200) {
          this.getPromocodes();
        }
      });
    }
  }
}
