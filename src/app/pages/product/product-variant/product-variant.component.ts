import { Component, OnInit } from "@angular/core";
import { Variant } from "src/app/core/data/variant";
import { VariantService } from "src/app/core/mock/variant.service";
import { ActivatedRoute } from "@angular/router";
import { AttributeService } from "src/app/core/mock/attribute.service";
import { AttributeValueService } from "src/app/core/mock/attribute-value.service";

@Component({
  selector: "app-product-variant",
  templateUrl: "./product-variant.component.html",
  styleUrls: ["./product-variant.component.scss"]
})
export class ProductVariantComponent implements OnInit {
  variants: Variant[];
  variant = new Variant();
  colors = new Array();
  brands = new Array();
  product_id;
  editBit = false;
  constructor(
    private _variantService: VariantService,
    private _route: ActivatedRoute,
    private _attributeService: AttributeValueService
  ) {}

  ngOnInit() {
    this.cancelVariant();
    this._route.params.subscribe(param => {
      this.variant.product_id = param.id;
      this.product_id = param.id;
      this._variantService.getVariants(param.id).subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.variants = res.data;
        }
      });
    });
    this._attributeService.getAttributes(0, 2).subscribe(res => {
      //@ts-ignore
      this.colors = res.attributeValues;
    });
    this._attributeService.getAttributes(0, 3).subscribe(res => {
      //@ts-ignore
      this.brands = res.attributeValues;
    });
  }

  cancelVariant() {
    this.editBit = false;
    this.variant = new Variant();
    this.variant.image_required = false;
    this.variant.parent = false;
  }

  getVariants() {
    this._variantService.getVariants(this.product_id).subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.variants = res.data;
      }
    });
  }

  saveVariant() {
    if (this.editBit) {
      this._variantService.updateVariants(this.variant).subscribe(
        res => {
          //@ts-ignore
          if (res.status == 200) {
            alert("Variant updated successfully.");
            this.getVariants();
          } else {
            alert("Variant is not updated. Please enter data properly.");
          }
        },
        err => {
          alert("Variant is not updated. Please try again later.");
        }
      );
    } else {
      this._variantService.addVariants(this.variant).subscribe(
        res => {
          //@ts-ignore
          if (res.status == 200) {
            alert("Variant added successfully.");
            this.getVariants();
          } else {
            alert("Variant is not added. Please enter data properly.");
          }
        },
        err => {
          alert("Variant is not added. Please try again later.");
        }
      );
    }
  }

  editVariant(variant) {
    this.variant = variant;
    this.editBit = true;
  }
}
