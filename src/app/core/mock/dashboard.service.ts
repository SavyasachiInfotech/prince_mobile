import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(private _http: HttpClient, private _config: Config) {}
  private _service = "dashboard/";
  private _dashboardDetailUrl =
    this._config.apiBaseUrl + this._service + "dashboard-detail";

  public getDashboardDetail() {
    let options = this._config.getHeader();
    return this._http.get<any>(this._dashboardDetailUrl, options);
  }
}
