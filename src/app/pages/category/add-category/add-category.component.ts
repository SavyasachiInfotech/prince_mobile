import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/core/mock/category.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"]
})
export class AddCategoryComponent implements OnInit {
  category;
  editBit = false;
  categories;
  public currentPage: number = 1;
  public lastPage: number = 0;
  public displayPages: number[] = new Array();

  constructor(
    private _categoryService: CategoryService,
    private _config: Config
  ) {
    this.cancelCategory();
    this.setCategory();
  }

  ngOnInit() {
    this._categoryService.countCategory().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        this.lastPage = Math.ceil(
          //@ts-ignore
          res.data[0].count / this._config.displayLimit
        );
        this.setPagination();
      }
    });
  }

  cancelCategory() {
    this.editBit = false;
    this.category = {
      name: "",
      description: "",
      image_required: false,
      mobile_required: false,
      is_display: true
    };
  }

  setCategory() {
    this._categoryService
      .getCategory(
        (this.currentPage * this._config.displayLimit) /
          this._config.displayLimit
      )
      .subscribe(
        res => {
          //@ts-ignore
          if (res.status == 200) {
            //@ts-ignore
            this.categories = res.categories;
          } else {
            // alert("Category not found. Please try again later.");
          }
        },
        err => {
          alert(this._config.err);
        }
      );
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

  changePage(pageno) {
    if (pageno != this.currentPage) {
      this.currentPage = pageno;
      this.setCategory();
    }
  }

  saveCategory() {
    if (this.category.name != "") {
      if (this.editBit) {
        this._categoryService.editCategory(this.category).subscribe(
          res => {
            console.log(res);
            //@ts-ignore
            if (res.status == 200) {
              alert("Category updted successfully.");
              this.cancelCategory();
              this.setCategory();
            } else {
              alert("Category not updated. Please try again later.");
            }
          },
          err => {
            alert(this._config.err);
          }
        );
      } else {
        this._categoryService.addCategory(this.category).subscribe(
          res => {
            //@ts-ignore
            if (res.status == 200) {
              alert("Category added successfully.");
              this.cancelCategory();
              this.setCategory();
            } else {
              alert("Category not added. Please try again later.");
            }
          },
          err => {
            alert(this._config.err);
          }
        );
      }
    } else {
      alert("Enter the data properly.");
    }
  }

  editCategory(category) {
    this.category = category;
    this.editBit = true;
  }
}
