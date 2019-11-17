import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/mock/product.service";
import { Config } from "src/app/core/data/config";
import { Router } from '@angular/router';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  lastPage;
  currentPage = 1;
  products = new Array();
  displayPages = new Array();

  constructor(
    private _productService: ProductService,
    private _config: Config,
    private _router:Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this._productService
      .getProducts(
        this.currentPage * this._config.displayLimit - this._config.displayLimit
      )
      .subscribe(
        res => {
          //@ts-ignore
          this.products = res.data;
          this.lastPage = Math.ceil(
            //@ts-ignore
            res.count[0].total / this._config.displayLimit
          );
          this.setPagination();
        },
        err => {
          this._config.showMessage("No products found. Plesse add a products");
        }
      );
  }

  changePageno(pageno) {
    this.currentPage = pageno;
    this.getProducts();
  }

  editProduct(product){
    this._router.navigate(["dashboard/product/add-product/"+product.product_id]);
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
}
