import { Injectable } from '@angular/core';
import { Config } from '../data/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private _config:Config,
              private _http:HttpClient) { }

  private service="mobile/";
  private _getMobileUrl=this._config.apiBaseUrl+this.service+"get-mobiles/";
  private _addMobileUrl=this._config.apiBaseUrl+this.service+"add-mobile";
  private _updateMobileUrl=this._config.apiBaseUrl+this.service+"update-mobile";

  getMobiles(up){
    let options=this._config.getHeader(); 
    return this._http.get<any>(this._getMobileUrl+up,options);
  }

  addMobile(mobile){
    let options=this._config.getHeader();
    return this._http.post<any>(this._addMobileUrl,mobile,options);
  }

  updateMobile(mobile){
    let options=this._config.getHeader();
    return this._http.put<any>(this._updateMobileUrl,mobile,options);
  }
}
