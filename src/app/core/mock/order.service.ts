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
  private _getOrderDetailUrl =
    this._config.apiBaseUrl + this.service + "get-order-detail";
  private _getReturnRequestsUrl =
    this._config.apiBaseUrl + this.service + "get-return-orders";
  private _acceptReturnRequestUrl =
    this._config.apiBaseUrl + this.service + "accept-return-order";
  private _paidReturnOrderUrl =
    this._config.apiBaseUrl + this.service + "paid-return-order";
  private _orderCountUrl =
    this._config.apiBaseUrl + this.service + "get-order-count";
  private _sellReportUrl =
    this._config.apiBaseUrl + this.service + "sell-report-data";

  recievedOrderCount() {
    let options = this._config.getHeader();
    return this._http.get(this._orderCountUrl, options);
  }

  acceptReturnOrder(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._acceptReturnRequestUrl, data, options);
  }

  paidReturnOrder(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._paidReturnOrderUrl, data, options);
  }

  getReturnRequestedOrder(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._getReturnRequestsUrl, data, options);
  }

  getOrdersByStatus(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._getOrderByStatusUrl, data, options);
  }

  changeStatus(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.changeStatusUrl, data, options);
  }

  getOrderDetail(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._getOrderDetailUrl, data, options);
  }

  getSellReportData(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._sellReportUrl, data, options);
  }
}
