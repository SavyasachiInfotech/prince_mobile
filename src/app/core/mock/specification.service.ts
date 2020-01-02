import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class SpecificationService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "specification/";

  private getAllSpecificationUrl =
    this._config.apiBaseUrl + this.service + "get-specifications";
  private addSpecificationUrl =
    this._config.apiBaseUrl + this.service + "add-specifications";
  private updateSpecificationUrl =
    this._config.apiBaseUrl + this.service + "update-specifications";
  private getSpecificationByIdUrl =
    this._config.apiBaseUrl + this.service + "get-specification-by-id/";

  getAllSpecifications() {
    let options = this._config.getHeader();
    return this._http.get<any>(this.getAllSpecificationUrl, options);
  }

  getSpecificationById(data) {
    let options = this._config.getHeader();
    return this._http.get<any>(this.getSpecificationByIdUrl + data, options);
  }

  addSpecification(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.addSpecificationUrl, data, options);
  }

  updateSpecification(data) {
    let options = this._config.getHeader();
    return this._http.put<any>(this.updateSpecificationUrl, data, options);
  }
}
