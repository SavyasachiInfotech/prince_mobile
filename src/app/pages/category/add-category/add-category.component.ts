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
  filesToUpload;
  imagechangeBit = false;
  public currentPage: number = 1;
  public lastPage: number = 0;
  public displayPages: number[] = new Array();

  constructor(
    private _categoryService: CategoryService,
    private _config: Config
  ) {
    this.cancelCategory();
  }

  ngOnInit() {
    this._categoryService.countCategory().subscribe(res => {
      this.setCategory();
      //@ts-ignore
      if (res.status == 200) {
        this.lastPage = Math.ceil(
          //@ts-ignore
          res.data[0].count / this._config.displayLimit
        );
        console.log(this.lastPage);
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
        this.currentPage * this._config.displayLimit - this._config.displayLimit
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

  saveCategory() {
    if (this.category.name != "") {
      let formData = new FormData();
      if (this.imagechangeBit) {
        const file: Array<File> = this.filesToUpload;
        formData.append("avatar", file[0], file[0]["name"]);
      }
      formData.append("name", this.category.name);
      formData.append("description", this.category.description);
      if (this.category.image_required) {
        formData.append("image_required", "1");
      } else {
        formData.append("image_required", "0");
      }
      if (this.category.mobile_required) {
        formData.append("mobile_required", "1");
      } else {
        formData.append("mobile_required", "0");
      }
      if (this.category.is_display) {
        formData.append("is_display", "1");
      } else {
        formData.append("is_display", "0");
      }
      if (this.editBit) {
        formData.append("category_id", this.category.category_id.toString());
        this._categoryService.editCategory(formData).subscribe(
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
        this._categoryService.addCategory(formData).subscribe(
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
