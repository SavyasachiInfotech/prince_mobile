import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../data/config';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {

  constructor(private _http:HttpClient,private _config:Config) { }

  private service="specification/";

  private getAllSpecificationUrl=this._config.apiBaseUrl+this.service+"get-specifications";

  getAllSpecifications(){
    let options=this._config.getHeader();
    return this._http.get(this.getAllSpecificationUrl,options);
  }
}
