import { Component, OnInit } from "@angular/core";
import { Variant } from "src/app/core/data/variant";
import { VariantService } from "src/app/core/mock/variant.service";
import { ActivatedRoute } from "@angular/router";
import { AttributeService } from "src/app/core/mock/attribute.service";
import { AttributeValueService } from "src/app/core/mock/attribute-value.service";
import { Config } from "src/app/core/data/config";
import { SpecificationService } from "src/app/core/mock/specification.service";
import { TaxService } from "src/app/core/mock/tax.service";

@Component({
  selector: "app-product-variant",
  templateUrl: "./product-variant.component.html",
  styleUrls: ["./product-variant.component.scss"]
})
export class ProductVariantComponent implements OnInit {
  variants: Variant[];
  variant = new Variant();
  attributes = new Array();
  mobiles = new Array();
  url = "";
  selectedMobile = 0;
  specifications = new Array();
  allValues = new Array();
  allMobiles = new Array();
  selectedAttributes = new Array();
  attr;
  att_value;
  spec;
  selectedSpecifications = new Array();
  selectQuantity = 0;
  values = new Array();
  product_id;
  editBit = false;
  taxes = new Array();
  constructor(
    private _variantService: VariantService,
    private _route: ActivatedRoute,
    private _attributeService: AttributeValueService,
    private _specificationService: SpecificationService,
    private _taxService: TaxService,
    private _config: Config
  ) {}

  ngOnInit() {
    this.cancelVariant();
    this.url = this._config.clientBaseUrl;
    this._route.params.subscribe(param => {
      this.variant.product_id = param.id;
      this.product_id = param.id;
      this._variantService.getVariants(param.id).subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.variants = res.data;
          //@ts-ignore
          this.mobiles = res.mobiles;
          this.selectedMobile = this.mobiles[0].model_id;
        }
      });
      this._taxService.getAllTaxes().subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.taxes = res.data;
          this.variant.tax_id = this.taxes.find(tax => tax.tax == 0).tax_id;
        }
      });
      this.getAttributes();
      this.getSpecifications();
    });
  }

  deleteVariant(variant, i) {
    if (confirm("Do you want to delete the Variant ?")) {
      this._variantService
        .deleteVariant({ variant_id: variant.variant_id })
        .subscribe(
          res => {
            //@ts-ignore
            if (res.status == 200) {
              this.variants.splice(i, 1);
            }
            //@ts-ignore
            this._config.showMessage(res.message);
          },
          err => {
            this._config.showMessage("Variant not deleted.");
          }
        );
    }
  }

  addMobile() {
    let data = this.mobiles.find(item => item.model_id == this.selectedMobile);
    data.quantity = this.selectQuantity;
    this.allMobiles.push(data);
  }

  editMobile(i) {
    this.selectedMobile = this.allMobiles[i].model_id;
    this.selectQuantity = this.allMobiles[i].quantity;
    this.allMobiles.splice(i, 1);
  }

  deleteMobile(i) {
    this.allMobiles.splice(i, 1);
  }

  getAttributes() {
    this._variantService.getAttributes().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.attributes = res.attributes;
        //@ts-ignore
        this.allValues = res.values;
        this.values = this.allValues.filter(
          item => item.attribute_id == this.attributes[0].attribute_id
        );
        this.att_value = this.values[0].attribute_value_id;
        this.attr = this.attributes[0].attribute_id;
      } else {
        //@ts-ignore
        this._config.showMessage(res.message);
      }
    });
  }

  getSpecifications() {
    this._specificationService.getAllSpecifications().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.specifications = res.data;
        this.spec = this.specifications[0].specification_id;
      }
    });
  }

  cancelVariant() {
    this.editBit = false;
    this.variant = new Variant();
    this.variant.image_required = false;
    this.variant.accept_promocode = true;
    this.variant.parent = true;

    this.variant.quantity = 0;
    this.variant.min_qty = 0;
    this.selectedAttributes = new Array();
    this.selectedSpecifications = new Array();
  }

  changeAttribute() {
    this.values = this.allValues.filter(item => item.attribute_id == this.attr);
    this.att_value = this.values[0].attribute_value_id;
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

  addSpecification() {
    this.selectedSpecifications.push(
      this.specifications.find(item => item.specification_id == this.spec)
    );
  }

  addAttributes() {
    this.selectedAttributes.push({
      value_id: this.att_value,
      att_id: this.attr,
      att_name: this.attributes.find(item => item.attribute_id == this.attr)
        .name,
      value: this.values.find(item => item.attribute_value_id == this.att_value)
        .value
    });
  }

  deleteAttribute(i) {
    this.selectedAttributes.splice(i, 1);
  }

  editAttribute(i) {
    this.attr = this.selectedAttributes[i].att_id;
    this.values = this.allValues.filter(item => item.attribute_id == this.attr);
    this.att_value = this.selectedAttributes[i].value_id;
    this.selectedAttributes.splice(i);
  }

  editSpecification(i) {
    this.spec = this.selectedSpecifications[i].specification_id;
    this.selectedSpecifications.splice(i, 1);
  }

  deleteSpecification(i) {
    this.selectedSpecifications.splice(i, 1);
  }

  saveVariant() {
    let specs = new Array();
    for (let i = 0; i < this.selectedSpecifications.length; i++) {
      specs.push(this.selectedSpecifications[i].specification_id);
    }
    let atts = new Array();
    for (let i = 0; i < this.selectedAttributes.length; i++) {
      atts.push(this.selectedAttributes[i].value_id);
    }
    //@ts-ignore
    this.variant.mobiles = this.allMobiles;
    //@ts-ignore
    this.variant.specifications = specs;
    //@ts-ignore
    this.variant.attributes = atts;
    console.log(this.variant);
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
    this._variantService
      .getSpecifications({ id: variant.variant_id })
      .subscribe(res => {
        //@ts-ignore
        if (res.status == 200) {
          //@ts-ignore
          this.selectedAttributes = res.attributes;

          //@ts-ignore
          this.selectedSpecifications = res.specifications;

          //@ts-ignore
          this.allMobiles = res.mobiles;
          console.log(this.allMobiles);
          for (let i = 0; i < this.allMobiles.length; i++) {
            this.allMobiles[i].model_id = this.allMobiles[i].mobile_id;
            this.allMobiles[i].model_name = this.mobiles.find(
              item => item.model_id == this.allMobiles[i].mobile_id
            ).model_name;
          }
        }
      });
    this.editBit = true;
  }
}
