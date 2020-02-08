import { Component, OnInit } from "@angular/core";
import { VariantService } from "src/app/core/mock/variant.service";
import { ActivatedRoute } from "@angular/router";
import { Config } from 'src/app/core/data/config';

@Component({
  selector: "app-add-images",
  templateUrl: "./add-images.component.html",
  styleUrls: ["./add-images.component.scss"]
})
export class AddImagesComponent implements OnInit {
  images = new Array();
  uploadLabel = new Array(6);
  filesToUpload: Array<File> = [];
  variant_id;
  variant;
  list = new Array();

  constructor(
    private _variantService: VariantService,
    private _route: ActivatedRoute,
    private _config:Config
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.variant_id = params.id;
      console.log(this.variant_id);
      this._variantService.getvariant(this.variant_id).subscribe(res => {
        //@ts-ignore
        this.variant = res.data[0];
        console.log(res);
        if (this.variant.list_image.length > 0) {
          this.list = JSON.parse(this.variant.list_image);
          for (let i = 0; i < 6; i++) {
            if (this.list.length > i) {
              this.images[i] = this._config.imageUrl + this.list[i];
              this.uploadLabel[i] = "Change Image";
            } else {
              this.uploadLabel[i] = "Upload Image";
            }
          }
        } else {
          for (let i = 0; i < 6; i++) {
            this.uploadLabel[i] = "Upload Image";
          }
        }
      });
    });
  }

  changeImage(files, index, event) {
    var reader = new FileReader();
    if (files[0].size > 5000000) {
      window.alert("Please upload image less than < 5 MB");
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
        if (files[0].size > 5000000) {
          window.alert("Please upload image less than < 5 MB");
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
                      let image = JSON.parse(this.variant.main_image);
                      this._variantService
                        .editUploadedImage(
                          formsData,
                          this.variant_id,
                          image[index]
                        )
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

                      this._variantService
                        .uploadImage(formsData, this.variant_id)
                        .subscribe(
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
