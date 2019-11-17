import { Injectable } from '@angular/core';
import { Config } from '../data/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _config:Config,
              private _http:HttpClient) { }

              private service="product/";
              private _addProductUrl=this._config.apiBaseUrl+this.service+"add-product";
              private _updateProductUrl=this._config.apiBaseUrl+this.service+"update-product";
              private _getProductUrl=this._config.apiBaseUrl+this.service+"get-products/";
              private _getProductByIdUrl=this._config.apiBaseUrl+this.service+"get-product-by-id/";
            
              getProducts(up){
                let options=this._config.getHeader();
                return this._http.get<any>(this._getProductUrl+up,options);
              }

              getProductById(id){
                let options=this._config.getHeader();
                return this._http.get<any>(this._getProductByIdUrl+id,options);
              }
            
              addProduct(product){
                let options=this._config.getHeader();
                return this._http.post<any>(this._addProductUrl,product,options);
              }
            
              updateProduct(product){
                let options=this._config.getHeader();
                return this._http.put<any>(this._updateProductUrl,product,options);
              }
}
