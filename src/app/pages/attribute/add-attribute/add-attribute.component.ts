import { Component, OnInit } from "@angular/core";
import { AttributeService } from "src/app/core/mock/attribute.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-add-attribute",
  templateUrl: "./add-attribute.component.html",
  styleUrls: ["./add-attribute.component.scss"]
})
export class AddAttributeComponent implements OnInit {
  attributes;
  attribute;
  editBit = false;
  currentPage;
  lastPage;
  limit;
  displayPages = new Array();

  constructor(
    private _attributeService: AttributeService,
    private _config: Config
  ) {
    this.limit = this._config.displayLimit;
    this.cancelAttribute();
    this.setAttributes();
  }

  ngOnInit() {
    this._attributeService.countAttribute().subscribe(res => {
      if (res.status == 200) {
        this.lastPage = Math.ceil(res.data[0].count / this.limit);
      }
    });
  }

  setAttributes() {
    this._attributeService.getAttributes(0).subscribe(
      res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.attributes = res.attributes;
        }
      },
      err => {
        alert(this._config.err);
      }
    );
  }

  cancelAttribute() {
    this.editBit = false;
    this.attribute = { name: "", description: "" };
  }

  saveAttribute() {
    if (this.attribute.name == "") {
      alert("Enter the data properly");
    } else {
      if (this.editBit) {
        this._attributeService
          .editAttribute(
            {
              name: this.attribute.name,
              description: this.attribute.description
            },
            this.attribute.id
          )
          .subscribe(
            res => {
              //@ts-ignore
              if (res.status == 200) {
                alert("Attribute updated successfully.");
                this.setAttributes();
                this.cancelAttribute();
              } else {
                alert("Attribute not updated. Please try again later.");
              }
            },
            err => {
              alert(this._config.err);
            }
          );
      } else {
        this._attributeService.addAttribute(this.attribute).subscribe(
          res => {
            //@ts-ignore
            if (res.status == 200) {
              alert("Attribute added successfully.");
              this.setAttributes();
              this.cancelAttribute();
            } else {
              alert("Attribute not added. Please try again later.");
            }
          },
          err => {
            alert(this._config.err);
          }
        );
      }
    }
  }

  editAttributeRequest(att) {
    this.attribute = att;
    this.editBit = true;
  }
}
