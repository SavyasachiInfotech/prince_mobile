import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/core/data/config";
import { AttributeService } from "src/app/core/mock/attribute.service";
import { AttributeValueService } from "src/app/core/mock/attribute-value.service";

@Component({
  selector: "app-add-attribute-value",
  templateUrl: "./add-attribute-value.component.html",
  styleUrls: ["./add-attribute-value.component.scss"]
})
export class AddAttributeValueComponent implements OnInit {
  values;
  id;
  attributes;
  attribute;
  editBit = false;

  constructor(
    private _attributeValueService: AttributeValueService,
    private _attributeService: AttributeService,
    private _config: Config
  ) {
    this.cancelAttribute();
    this.setAttributes();
  }

  ngOnInit() {}

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
    this._attributeValueService.getAttributes(0, 2).subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.values = res.attributeValues;
      }
    });
  }

  changeAttribute() {
    this._attributeValueService
      .getAttributes(0, this.attribute.attribute_id)
      .subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.values = res.attributeValues;
        } else {
          this.values = new Array();
        }
      });
  }

  cancelAttribute() {
    this.editBit = false;
    this.attribute = { attribute_id: 2, value: "" };
  }

  saveAttribute() {
    if (this.attribute.value == "") {
      alert("Enter the data properly");
    } else {
      if (this.editBit) {
        this._attributeValueService
          .editAttribute(this.attribute, this.attribute.id)
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
        this._attributeValueService.addAttributeValue(this.attribute).subscribe(
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
