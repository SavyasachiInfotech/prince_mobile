import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class CategoryImageService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private _service = "category-image/";

  private _categoryImageUploadUrl =
    this._config.apiBaseUrl + this._service + "upload-image/";
  private _editCategoryImageUrl =
    this._config.apiBaseUrl + this._service + "editImageUpload/";

  uploadImage(data, category_id) {
    let options = this._config.getHeader();
    return this._http.post<any>(
      this._categoryImageUploadUrl + category_id,
      data,
      options
    );
  }

  editUploadedImage(data, category_id, name) {
    let options = this._config.getHeader();
    return this._http.post<any>(
      this._editCategoryImageUrl + category_id + "/" + name,
      data,
      options
    );
  }
}
