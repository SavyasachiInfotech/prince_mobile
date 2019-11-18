import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../data/config';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private _http:HttpClient,private _config:Config) { }

  private service="tax/";

  private _getAllTaxUrl=this._config.apiBaseUrl+this.service;
  private _addTaxUrl=this._config.apiBaseUrl+this.service+"add-tax";
  private _updateTaxUrl=this._config.apiBaseUrl+this.service+"update-tax";


  getAllTaxes(){
    let options=this._config.getHeader();
    return this._http.get<any>(this._getAllTaxUrl,options);
  }

  addTax(data){
    let options=this._config.getHeader();
    return this._http.post<any>(this._addTaxUrl,data,options);
  }

  updateTax(data){
    let options=this._config.getHeader();
    return this._http.post<any>(this._updateTaxUrl,data,options);
  }
}
