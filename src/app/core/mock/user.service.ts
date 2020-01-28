import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "authentication/";

  private getUserByPageNoUrl =
    this._config.apiBaseUrl + this.service + "get-users-by-page/";
  private blockUserUrl = this._config.apiBaseUrl + this.service + "block-user";

  getUserByPageno(pageno) {
    let options = this._config.getHeader();
    return this._http.get<any>(this.getUserByPageNoUrl + pageno, options);
  }

  blockUser(data) {
    let options = this._config.getHeader();
    return this._http.post<any>(this.blockUserUrl, data, options);
  }
}
