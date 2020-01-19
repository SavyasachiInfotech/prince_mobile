import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/core/data/config";
import { CategoryService } from "src/app/core/mock/category.service";
import { InsertProduct } from "src/app/core/data/insert-product";
import { ProductService } from "src/app/core/mock/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  categories = new Array();
  subcategories = new Array();
  allSubCategories = new Array();
  product: InsertProduct = new InsertProduct();
  products = new Array();
  editBit = false;
  product_id: number = 0;

  constructor(
    private _config: Config,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.cancelProduct();
  }

  ngOnInit() {
    this._route.params.subscribe(data => {
      this.product_id = data.id;
      if (this.product_id > 0) {
        this._productService.getProductById(this.product_id).subscribe(res => {
          //@ts-ignore
          if (res.status == 200) {
            //@ts-ignore
            this.product = res.product[0];
            this.getCategories(1);
          } else {
            this.getCategories(0);
          }
        });
      } else {
        this.getCategories(0);
      }
    });
  }

  cancelProduct() {
    this.product = new InsertProduct();
    this.product.is_display = true;
    this.editBit = false;
  }

  getCategories(productBit) {
    this._categoryService.getAllCategories().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.categories = res.categories.filter(item => item.parent_id == 0);
        //@ts-ignore
        this.allSubCategories = res.categories.filter(
          item => item.parent_id != 0
        );
        this.subcategories = this.allSubCategories.filter(
          item => item.parent_id == this.product.category_id
        );
        //@ts-ignore
        if (this.product.parent_id > 0 && productBit == 1) {
          this.product.subcategory_id = this.product.category_id;
          //@ts-ignore
          this.product.category_id = this.product.parent_id;
        }
      }
    });
  }

  getSubCategories() {
    this.subcategories = this.allSubCategories.filter(
      item => item.parent_id == this.product.category_id
    );
  }

  setProduct(product) {
    this.product.id = product.id;
    this.product.description = product.description;
    this.product.category_id = product.category_id;
    this.product.is_display = product.display;
    // this.getSubCategories(this.product.category_id);
    this.product.subcategory_id = product.sub_category_id;
    this.editBit = true;
  }

  addProduct() {
    if (this.product.subcategory_id > 0) {
      this.product.category_id = this.product.subcategory_id;
    }
    if (this.product_id > 0) {
      this._productService.updateProduct(this.product).subscribe(
        res => {
          alert("Product is updated successfully");
          this.cancelProduct();
          this._router.navigate(["dashboard/product"]);
        },
        err => {
          alert("Product is not updated. Please try again later.");
        }
      );
    } else {
      this._productService.addProduct(this.product).subscribe(
        res => {
          alert("Product is added successfully.");
          this._router.navigate(["dashboard/product"]);
          this.cancelProduct();
        },
        err => {
          alert("Product is not added successfully. Please try agin later.");
        }
      );
    }
  }
}
