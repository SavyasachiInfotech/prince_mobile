import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class SupportService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "support/";

  private _getSupportUrl = this._config.apiBaseUrl + this.service;
  private _updateSupportUrl =
    this._config.apiBaseUrl + this.service + "update-support";

  getSupport() {
    let options = this._config.getHeader();
    return this._http.get<any>(this._getSupportUrl, options);
  }

  updateSupport(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._updateSupportUrl, data, options);
  }
}
