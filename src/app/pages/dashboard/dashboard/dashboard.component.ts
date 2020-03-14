import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/core/mock/dashboard.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private _dashboardService: DashboardService,
    private _config: Config
  ) {}

  ngOnInit() {
    this._dashboardService.getDashboardDetail().subscribe(res => {
      console.log(res);
    });
  }
}
