import { Component, OnInit } from "@angular/core";
import { AnnouncementService } from "src/app/core/mock/announcement.service";
import { Config } from "src/app/core/data/config";
import { Router } from "@angular/router";

@Component({
  selector: "app-announcement-list",
  templateUrl: "./announcement-list.component.html",
  styleUrls: ["./announcement-list.component.scss"]
})
export class AnnouncementListComponent implements OnInit {
  constructor(
    private _announcementService: AnnouncementService,
    private _router: Router
  ) {}

  public announcements = new Array();

  ngOnInit() {
    this.getAnnouncement();
  }

  getAnnouncement() {
    this._announcementService.getAllAnnouncement().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.announcements = res.announcements;
      }
    });
  }

  editAnnouncementRequest(announcement) {
    this._router.navigate([
      "dashboard/announcement/add-announcement/" + announcement.id
    ]);
  }

  deleteAnnouncement(announcement) {
    if (confirm("Are you want to delete Announcement?")) {
      let data = { id: announcement.id };
      this._announcementService.deleteAnnouncement(data).subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          this.getAnnouncement();
        }
      });
    }
  }
}
