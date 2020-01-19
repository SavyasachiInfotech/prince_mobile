import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";

@Injectable({
  providedIn: "root"
})
export class AnnouncementService {
  constructor(private _http: HttpClient, private _config: Config) {}

  private service = "announcement/";

  private getAllAnnouncementUrl =
    this._config.apiBaseUrl + this.service + "get-announcement";
  private addAnnouncementUrl =
    this._config.apiBaseUrl + this.service + "add-announcement";
  private updateAnnouncementUrl =
    this._config.apiBaseUrl + this.service + "update-announcement";
  private getAnnouncementByIdUrl =
    this._config.apiBaseUrl + this.service + "get-announcement/";
  private deleteAnnouncementUrl =
    this._config.apiBaseUrl + this.service + "delete-announcement";

  getAllAnnouncement() {
    let options = this._config.getHeader();
    return this._http.get(this.getAllAnnouncementUrl, options);
  }

  getAnnouncementById(id) {
    let options = this._config.getHeader();
    return this._http.get(this.getAnnouncementByIdUrl + id, options);
  }

  addAnnouncement(announcement) {
    let options = this._config.getHeader();
    return this._http.post(this.addAnnouncementUrl, announcement, options);
  }

  updateAnnouncement(announcement) {
    let options = this._config.getHeader();
    return this._http.post(this.updateAnnouncementUrl, announcement, options);
  }

  deleteAnnouncement(data) {
    let options = this._config.getHeader();
    return this._http.post(this.deleteAnnouncementUrl, data, options);
  }
}
