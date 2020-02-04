import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/core/mock/category.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-add-sub-category",
  templateUrl: "./add-sub-category.component.html",
  styleUrls: ["./add-sub-category.component.scss"]
})
export class AddSubCategoryComponent implements OnInit {
  categories;
  subCategories;
  category;
  editBit = false;
  filesToUpload;
  imagechangeBit = false;

  constructor(
    private _categoryService: CategoryService,
    private _config: Config
  ) {
    this.setSubCategory();
    this.cancelCategory();
  }

  ngOnInit() {}

  cancelCategory() {
    this.category = {
      name: "",
      description: "",
      parent_id: 1,
      is_display: true
    };
    this.editBit = false;
  }

  changeImage(files, event) {
    if (files[0].size > 2000000) {
      window.alert("Please upload image less than < 2 MB");
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      window.alert("Please select images only");
      return;
    }

    this.filesToUpload = <Array<File>>event.target.files;
    this.imagechangeBit = true;
  }

  setSubCategory() {
    this._categoryService.getAllCategories().subscribe(
      res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.categories = res.categories;
          this.categories = this.categories.filter(item => item.parent_id == 0);
        }
      },
      err => {
        alert(this._config.err);
      }
    );
    this._categoryService.getSubCategory(1, 0).subscribe(
      res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.subCategories = res.categories;
        }
      },
      err => {
        alert(this._config.err);
      }
    );
  }

  changeCategory() {
    this._categoryService.getSubCategory(this.category.parent_id, 0).subscribe(
      res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.subCategories = res.categories;
        }
      },
      err => {
        alert(this._config.err);
      }
    );
  }

  editCategory(category) {
    this.category = category;
    this.editBit = true;
  }

  saveCategory() {
    if (this.category.name != "") {
      let formData = new FormData();
      if (this.imagechangeBit) {
        const file: Array<File> = this.filesToUpload;
        formData.append("avatar", file[0], file[0]["name"]);
      }
      formData.append("name", this.category.name);
      formData.append("description", this.category.description);
      if (this.category.is_display) {
        formData.append("is_display", "1");
      } else {
        formData.append("is_display", "0");
      }
      formData.append("parent_id", this.category.parent_id);
      if (this.editBit) {
        formData.append("category_id", this.category.category_id.toString());
        this._categoryService.editSubCategory(formData).subscribe(
          res => {
            alert("Sub category updated successfully");
            this.cancelCategory();
            this.setSubCategory();
          },
          err => {
            alert(this._config.err);
          }
        );
      } else {
        this._categoryService.addSubCategory(formData).subscribe(
          res => {
            //@ts-ignore
            if (res.status == 200) {
              alert("Sub category added successfully");
              this.cancelCategory();
              this.setSubCategory();
            } else {
              alert("Sub Category is not added. Please try again later.");
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
}
