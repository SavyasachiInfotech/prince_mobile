import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "authentication/";

  private _loginAdminUrl =
    this._config.apiBaseUrl + this.service + "loginAdmin";

  loginAdmin(user) {
    return this._http.post<any>(this._loginAdminUrl, user);
  }
}
