import { Injectable } from '@angular/core';
import { Config } from '../data/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  service="attribute/";

  constructor(private _config:Config,
              private _http:HttpClient) { }

  private addAttributeUrl=this._config.apiBaseUrl+this.service+"add-attribute";
  private editAttributeUrl=this._config.apiBaseUrl+this.service+"edit-attribute/";
  private getAttributeUrl=this._config.apiBaseUrl+this.service+"getAttributes/";

  addAttribute(attribute){
    let options=this._config.getHeader();
    return this._http.post<any>(this.addAttributeUrl,attribute,options);
  }

  editAttribute(attribute,attribute_id){
    let options=this._config.getHeader();
    return this._http.put<any>(this.editAttributeUrl+attribute_id,attribute,options);
  }

  getAttributes(up){
    let options=this._config.getHeader();
    return this._http.get<any>(this.getAttributeUrl+up,options);
  }
}
