import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from "src/app/core/data/config";
import { AnnouncementService } from "src/app/core/mock/announcement.service";

@Component({
  selector: "app-add-announcement",
  templateUrl: "./add-announcement.component.html",
  styleUrls: ["./add-announcement.component.scss"]
})
export class AddAnnouncementComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _config: Config,
    private _announcementService: AnnouncementService,
    private _router: Router
  ) {}

  public announcement = {
    id: 0,
    title: "",
    description: ""
  };

  ngOnInit() {
    this._route.params.subscribe(data => {
      if (data.id != 0) {
        this._announcementService
          .getAnnouncementById(data.id)
          .subscribe(res => {
            //@ts-ignore
            if (res.status == 200) {
              //@ts-ignore
              if (res.data.length > 0) {
                //@ts-ignore
                this.announcement = res.data[0];
              }
            }
          });
      }
    });
  }

  saveAnnouncement() {
    if (this.announcement.id == 0) {
      this._announcementService
        .addAnnouncement(this.announcement)
        .subscribe(res => {
          //@ts-ignore
          this._config.showMessage(res.message);
          //@ts-ignore
          if (res.status == 200) {
            this._router.navigate(["dashboard/announcement"]);
          }
        });
    } else {
      this._announcementService
        .updateAnnouncement(this.announcement)
        .subscribe(res => {
          //@ts-ignore
          this._config.showMessage(res.message);
          //@ts-ignore
          if (res.status == 200) {
            this._router.navigate(["dashboard/announcement"]);
          }
        });
    }
  }

  cancelAnnouncement() {
    this.announcement = {
      id: 0,
      title: "",
      description: ""
    };
  }
}
