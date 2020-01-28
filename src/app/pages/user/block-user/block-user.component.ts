import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/mock/user.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-block-user",
  templateUrl: "./block-user.component.html",
  styleUrls: ["./block-user.component.scss"]
})
export class BlockUserComponent implements OnInit {
  public users: any[] = new Array();
  public currentPage = 1;
  public displayPages: number[] = new Array();
  public lastPage = 1;
  constructor(private _userService: UserService, private _config: Config) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUserByPageno(this.currentPage).subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.users = res.users;
        //@ts-ignore
        this.lastPage = Math.ceil(res.count / this._config.displayLimit);
        this.setPagination();
      }
    });
  }

  blockUnblockUser(blockBit, user) {
    let message = "";
    if (blockBit == 1) {
      message = "Are you want to block the User ?";
    } else {
      message = "Are you want to active User ?";
    }
    if (confirm(message)) {
      this._userService
        .blockUser({ user_id: user.id, block_bit: blockBit })
        .subscribe(res => {
          //@ts-ignore
          if (res.status == 200) {
            this.getUsers();
          }
        });
    }
  }

  changePageno(pageno) {
    this.currentPage = pageno;
    this.getUsers();
  }

  setPagination() {
    delete this.displayPages;
    this.displayPages = new Array();
    let startPage;

    if (this.currentPage > 5 && this.currentPage < this.lastPage - 5) {
      startPage = this.currentPage - 5;
      for (let i = 0; i < this.currentPage + 5; i++) {
        this.displayPages.push(startPage);
        startPage = startPage + 1;
      }
    } else {
      if (this.currentPage < 5) {
        for (let i = 0; i < 10; i++) {
          this.displayPages.push(i + 1);
          if (i + 1 == this.lastPage) {
            break;
          }
        }
      } else {
        for (let i = this.lastPage - 10; i <= this.lastPage; i++) {
          if (i > 0) {
            this.displayPages.push(i);
          }
        }
      }
    }
  }
}
