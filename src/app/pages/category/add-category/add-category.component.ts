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

  constructor(
    private _categoryService: CategoryService,
    private _config: Config
  ) {
    this.cancelCategory();
    this.setCategory();
  }

  ngOnInit() {}

  cancelCategory() {
    this.editBit = false;
    this.category = {
      name: "",
      description: "",
      image_required: false,
      mobile_required: false
    };
  }

  setCategory() {
    this._categoryService.getCategory(0).subscribe(
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

  saveCategory() {
    console.log(this.category);
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
