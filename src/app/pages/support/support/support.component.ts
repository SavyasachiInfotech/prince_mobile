import { Component, OnInit } from "@angular/core";
import { SupportService } from "src/app/core/mock/support.service";

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.scss"]
})
export class SupportComponent implements OnInit {
  constructor(private _supportService: SupportService) {}

  ngOnInit() {
    this._supportService.getSupport().subscribe(res => {
      console.log(res);
    });
  }
}
