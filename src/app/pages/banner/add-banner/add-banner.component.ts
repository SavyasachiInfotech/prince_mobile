import { Component, OnInit } from "@angular/core";
import { BannerService } from "src/app/core/mock/banner.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-add-banner",
  templateUrl: "./add-banner.component.html",
  styleUrls: ["./add-banner.component.scss"]
})
export class AddBannerComponent implements OnInit {
  images = new Array();
  uploadLabel = new Array(6);
  filesToUpload: Array<File> = [];
  variant_id;
  variant;
  cat_name = "";
  list = new Array();
  constructor(private _bannerService: BannerService, private _config: Config) {}

  ngOnInit() {
    this._bannerService.getBanners().subscribe(res => {
      //@ts-ignore
      this.variant = res.banners;
      //@ts-ignore
      this.list = res.banners;
      for (let i = 0; i < 6; i++) {
        if (i < this.variant.length) {
          this.images[i] = this._config.bannerUrl + this.variant[i].image;
          this.uploadLabel[i] = "Change Image";
        } else {
          this.uploadLabel[i] = "Upload Image";
        }
      }
    });
  }

  changeImage(files, index, event) {
    var reader = new FileReader();
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
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      var img = new Image();
      //@ts-ignore
      img.src = reader.result;
      img.onload = () => {
        //console.log(img.width,img.height)
        if (img.width < 800 || img.height < 800) {
          window.alert("Please select image with minimum resolution 800*800");
          return;
        }
      };

      this.images[index] = reader.result;
    };
  }

  uploadImage(files, index) {
    let check = 0;
    if (this.uploadLabel[index] !== "Image Uploaded") {
      try {
        if (files[0].size > 2000000) {
          window.alert("Please upload image less than < 2 MB");
          check = 1;
          return;
        } else {
          var mimeType = files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            window.alert("Please select images only");
            check = 1;
            return;
          } else {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = _event => {
              var img = new Image();
              //@ts-ignore
              img.src = reader.result;
              img.onload = () => {
                if (check == 0) {
                  const formsData = new FormData();
                  const file: Array<File> = this.filesToUpload;
                  for (let i = 0; i < file.length; i++) {
                    formsData.append("uploads[]", file[i], files[i]["name"]);
                  }
                  if (index < this.list.length) {
                    this._bannerService
                      .editUploadedImage(formsData, this.variant[index].id)
                      .subscribe(
                        res => {
                          this.uploadLabel[index] = "Image Uploaded";
                        },
                        err => {
                          window.alert(
                            "Image is not uploaded. Please try again"
                          );
                        }
                      );
                  } else {
                    // formsData.set('file',this.filesToUpload[0]);

                    this._bannerService.uploadImage(formsData, 0).subscribe(
                      res => {
                        this.uploadLabel[index] = "Image Uploaded";
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  }
                }
              };
            };
          }
        }
      } catch {
        window.alert("Please select the files");
      }
    } else {
      window.alert("This image uploaded already");
    }
  }
}
