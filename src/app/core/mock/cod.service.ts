import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class CodService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "cod";
  private _getCodChargeUrl = this._config.apiBaseUrl + this.service + "/";
  private _updateCodChargeUrl =
    this._config.apiBaseUrl + this.service + "/change-cod-charge";

  getCodCharge() {
    let options = this._config.getHeader();
    return this._http.get<any>(this._getCodChargeUrl, options);
  }

  changeCodCharge(data) {
    let options = this._config.getHeader();
    return this._http.put<any>(this._updateCodChargeUrl, data, options);
  }
}
