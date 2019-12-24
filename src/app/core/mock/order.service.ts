import { Injectable } from "@angular/core";
import { Config } from "../data/config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private _config: Config, private _http: HttpClient) {}

  private service = "order/";
  private _getOrderByStatusUrl =
    this._config.apiBaseUrl + this.service + "get-orders-by-status";
  private changeStatusUrl =
    this._config.apiBaseUrl + this.service + "change-status";

  getOrdersByStatus(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._getOrderByStatusUrl, data, options);
  }

  changeStatus(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.changeStatusUrl, data, options);
  }
}
