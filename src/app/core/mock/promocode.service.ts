import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class PromocodeService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "promocode/";

  private getPromocodeUrl =
    this._config.apiBaseUrl + this.service + "get-promocode";
  private addPromocodeUrl =
    this._config.apiBaseUrl + this.service + "add-promocode";
  private updatePromocodeUrl =
    this._config.apiBaseUrl + this.service + "update-promocode";
  private getPromocodeByIdUrl =
    this._config.apiBaseUrl + this.service + "get-promocode-by-id/";
  private deletePromocodeUrl =
    this._config.apiBaseUrl + this.service + "delete-promocode/";

  public getPromocodeList() {
    let options = this._config.getHeader();
    return this._http.get(this.getPromocodeUrl, options);
  }

  public addPromocode(data) {
    let options = this._config.getHeader();
    return this._http.post(this.addPromocodeUrl, data, options);
  }

  public updatePromocode(data) {
    let options = this._config.getHeader();
    return this._http.post(this.updatePromocodeUrl, data, options);
  }

  public deletePromocode(id) {
    let options = this._config.getHeader();
    return this._http.delete(this.deletePromocodeUrl + id, options);
  }

  public getPromocodeById(id) {
    let options = this._config.getHeader();
    return this._http.get(this.getPromocodeByIdUrl + id, options);
  }
}
