import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  goToLink(link) {
    this._router.navigate(["dashboard/" + link]);
  }

  logout() {
    localStorage.clear();
    this._router.navigate([""]);
  }
}
