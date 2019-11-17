import { Injectable } from "@angular/core";
import { Config } from "../data/config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private _config: Config, private _http: HttpClient) {}

  service = "category/";

  private getCategoryUrl =
    this._config.apiBaseUrl + this.service + "getCategory/";
  private addCategoryUrl =
    this._config.apiBaseUrl + this.service + "add-category";
  private editCategoryUrl =
    this._config.apiBaseUrl + this.service + "edit-category";
  private getSubCategoryUrl =
    this._config.apiBaseUrl + this.service + "subCategory/";
  private addSubCategoryUrl =
    this._config.apiBaseUrl + this.service + "add-subcategory";
  private editSubCategoryUrl =
    this._config.apiBaseUrl + this.service + "edit-subcategory";
  private countCategoryUrl =
    this._config.apiBaseUrl + this.service + "count-category";
    private _getAllCategoryUrl=this._config.apiBaseUrl+this.service;


  getAllCategories(){
    let options=this._config.getHeader();
    return this._http.get<any>(this._getAllCategoryUrl,options);
  }

  addCategory(category) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.addCategoryUrl, category, options);
  }

  editCategory(category) {
    let options = this._config.getHeader();
    return this._http.put<any>(this.editCategoryUrl, category, options);
  }

  getCategory(up) {
    let options = this._config.getHeader();
    return this._http.get<any>(this.getCategoryUrl + up, options);
  }

  addSubCategory(category) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.addSubCategoryUrl, category, options);
  }

  editSubCategory(category) {
    let options = this._config.getHeader();
    return this._http.put<any>(this.editSubCategoryUrl, category, options);
  }

  getSubCategory(parent, up) {
    let options = this._config.getHeader();
    return this._http.get<any>(
      this.getSubCategoryUrl + parent + "/" + up,
      options
    );
  }

  countCategory() {
    let options = this._config.getHeader();
    return this._http.get<any>(this.countCategoryUrl, options);
  }
}
