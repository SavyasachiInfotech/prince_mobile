import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/mock/auth.service";
import { Router } from "@angular/router";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  };
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {}

  loginAdmin() {
    let pattern = new RegExp(/.+@.+\..+/);
    if (pattern.test(this.user.email)) {
      if (this.user.password.length > 4) {
        this.user.password = Md5.hashStr(this.user.password).toString();
        this._authService.loginAdmin(this.user).subscribe(
          res => {
            if (res.status == 200) {
              localStorage.setItem("token", res.token);
              alert("Logged in successfully.");
              this._router.navigate(["dashboard"]);
            } else {
              alert("Enter data properly.");
            }
          },
          err => {
            alert("No response found from server. Please try again later.");
          }
        );
      } else {
        alert("Enter the password more than 8 character.");
      }
    } else {
      alert("Enter valid Email");
    }
  }
}
