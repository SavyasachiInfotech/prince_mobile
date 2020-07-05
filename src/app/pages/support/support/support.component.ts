import { Component, OnInit } from "@angular/core";
import { SupportService } from "src/app/core/mock/support.service";

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.scss"]
})
export class SupportComponent implements OnInit {
  constructor(private _supportService: SupportService) {}
  public mobile1 = "";
  public mobile2 = "";
  public mobile3 = "";
  public mobile4 = "";
  public whatsapp_link = "";
  ngOnInit() {
    this._supportService.getSupport().subscribe(res => {
      console.log(res);
      //@ts-ignore
      if (res.status != 200) {
        alert("Support data not found.");
      } else {
        //@ts-ignore
        let mobiles = JSON.parse(res.data[0].mobiles);
        this.mobile1 = mobiles[0] ? mobiles[0] : "";
        this.mobile2 = mobiles[1] ? mobiles[1] : "";
        this.mobile3 = mobiles[3] ? mobiles[2] : "";
        this.mobile4 = mobiles[4] ? mobiles[4] : "";
        //@ts-ignore
        this.whatsapp_link = res.data[0].whatsapp_link;
      }
    });
  }

  updateSupport() {
    let mobiles = [this.mobile1, this.mobile2, this.mobile3, this.mobile4];
    let data = {
      mobiles: JSON.stringify(mobiles),
      whatsapp_link: this.whatsapp_link
    };
    this._supportService.updateSupport(data).subscribe(res => {
      //@ts-ignore
      alert(res.message);
    });
  }
}
