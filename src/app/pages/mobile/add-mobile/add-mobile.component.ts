import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/core/data/config";
import { MobileService } from "src/app/core/mock/mobile.service";

@Component({
  selector: "app-add-mobile",
  templateUrl: "./add-mobile.component.html",
  styleUrls: ["./add-mobile.component.scss"]
})
export class AddMobileComponent implements OnInit {
  mobile;
  mobiles;
  editBit = false;

  constructor(private _config: Config, private _mobileService: MobileService) {
    this.cancelMobile();
    this.setMobiles();
  }

  ngOnInit() {}

  setMobiles() {
    this._mobileService.getMobiles(0).subscribe(
      res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.mobiles = res.data;
        } else {
          alert("No recored found for mobile");
        }
      },
      err => {
        alert(this._config.err);
      }
    );
  }

  cancelMobile() {
    this.mobile = { name: "" };
    this.editBit = false;
  }

  editMobile(mobile) {
    this.mobile.id = mobile.mobile_id;
    this.mobile.name = mobile.model_name;
    this.editBit = true;
  }

  addMobile() {
    if (this.mobile.name != "") {
      if (this.editBit) {
        this._mobileService.updateMobile(this.mobile).subscribe(
          res => {
            alert("Mobile updated successfully");
            this.cancelMobile();
            this.setMobiles();
          },
          err => {
            alert("Mobile is not updated. Please try again later.");
          }
        );
      } else {
        this._mobileService.addMobile(this.mobile).subscribe(
          res => {
            alert("Mobile is added successfully.");
            this.cancelMobile();
            this.setMobiles();
          },
          err => {
            alert("Mobile is not added. Please try again later.");
          }
        );
      }
    } else {
      alert("Enter the data properly");
    }
  }
}
