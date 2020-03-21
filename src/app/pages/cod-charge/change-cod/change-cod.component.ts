import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/core/data/config";
import { CodService } from "src/app/core/mock/cod.service";

@Component({
  selector: "app-change-cod",
  templateUrl: "./change-cod.component.html",
  styleUrls: ["./change-cod.component.scss"]
})
export class ChangeCodComponent implements OnInit {
  public cod = {
    codCharge: 0
  };
  constructor(private _config: Config, private _codService: CodService) {}

  ngOnInit() {
    this._codService.getCodCharge().subscribe(
      res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.cod = res.data;
        }
      },
      err => {}
    );
  }

  changeCod() {
    this._codService.changeCodCharge(this.cod).subscribe(res => {
      //@ts-ignore
      this._config.showMessage(res.message);
    });
  }
}
