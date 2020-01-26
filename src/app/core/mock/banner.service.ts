import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class BannerService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "banner/";
  private getBannersUrl =
    this._config.apiBaseUrl + this.service + "get-banners";
  private uploadImageUrl =
    this._config.apiBaseUrl + this.service + "upload-image/";
  private editImageUtl =
    this._config.apiBaseUrl + this.service + "editImageUpload/";

  public getBanners() {
    let options = this._config.getHeader();
    return this._http.get(this.getBannersUrl, options);
  }

  public uploadImage(data, id) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.uploadImageUrl + id, data, options);
  }

  public editUploadedImage(data, id) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.editImageUtl + id, data, options);
  }
}
