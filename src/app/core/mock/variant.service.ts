import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class VariantService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "variant/";

  private _getVariantUrl =
    this._config.apiBaseUrl + this.service + "get-variants/";
  private _addVariantUrl =
    this._config.apiBaseUrl + this.service + "add-variants";
  private _updateVariantUrl =
    this._config.apiBaseUrl + this.service + "/update-variant";
  private editUploadedImageUrl =
    this._config.apiBaseUrl + "upload-image/editImageUpload";
  private uploadImageUrl =
    this._config.apiBaseUrl + "upload-image/upload-image";
  private getvarianturl =
    this._config.apiBaseUrl + this.service + "get-variant/";
  private getAttributeUrl =
    this._config.apiBaseUrl + "/attribute/get-attributes-variant";
  private getSpecificationsUrl =
    this._config.apiBaseUrl + this.service + "get-attributes";
  private _getFinishedProductsUrl =
    this._config.apiBaseUrl + this.service + "get-finished-quantity";

  getAttributes() {
    let options = this._config.getHeader();
    return this._http.get<any>(this.getAttributeUrl, options);
  }

  getFinishedProducts() {
    let options = this._config.getHeader();
    return this._http.get<any>(this._getFinishedProductsUrl, options);
  }

  getSpecifications(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.getSpecificationsUrl, data, options);
  }

  getvariant(id) {
    let options = this._config.getHeader();
    return this._http.get(this.getvarianturl + id, options);
  }

  getVariants(variant_id) {
    let options = this._config.getHeader();
    return this._http.get<any>(this._getVariantUrl + variant_id, options);
  }

  addVariants(variant) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._addVariantUrl, variant, options);
  }

  updateVariants(variant) {
    let options = this._config.getHeader();
    return this._http.put<any>(this._updateVariantUrl, variant, options);
  }

  uploadImage(formdata, variant_id) {
    let options = this._config.getHeader();
    return this._http.post<any>(
      this.uploadImageUrl + "/" + variant_id,
      formdata,
      options
    );
  }

  editUploadedImage(formdata, variant_id, image_name) {
    console.log(image_name);
    let options = this._config.getHeader();
    return this._http.post<any>(
      this.editUploadedImageUrl + "/" + variant_id + "/" + image_name,
      formdata,
      options
    );
  }
}
