import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/core/data/config';
import { CategoryService } from 'src/app/core/mock/category.service';
import { InsertProduct } from 'src/app/core/data/insert-product';
import { ProductService } from 'src/app/core/mock/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories=new Array();
  subcategories=new Array();
  product:InsertProduct;
  products=new Array();
  editBit=false;

  constructor(private _config:Config,
              private _categoryService:CategoryService,
              private _productService:ProductService) { 
                this.getCategories();
                this.cancelProduct(); 
                this.setProduct();
              }

  ngOnInit() {
  }

  setProduct(){
    this._productService.getProducts(0).subscribe(res=>{
      //@ts-ignore
      if(res.status==200){
        //@ts-ignore
        this.products=res.data;
      }
    })
  }

  cancelProduct(){
    this.product=new InsertProduct();
    this.product.display_bit=true;
    this.product.is_mobile_product=false;
    this.editBit=false;
  }

  getCategories(){
    this._categoryService.getCategory(0).subscribe(res=>{
      //@ts-ignore
      if(res.status==200){
        //@ts-ignore
        this.categories=res.categories;
        this.product.category_id=this.categories[0].id;
        this.getSubCategories(this.product.category_id);
      }
    });
  }

  getSubCategories(category_id){
    this._categoryService.getSubCategory(category_id,0).subscribe(res=>{
      //@ts-ignore
      if(res.status==200){
        //@ts-ignore
        this.subcategories=res.categories;
        this.product.subcategory_id=this.subcategories[0].id;
      }
    });
  }

  editProduct(product){
    this.product.id=product.id;
    this.product.description=product.description;
    this.product.category_id=product.category_id;
    this.product.display_bit=product.display;
    this.product.is_mobile_product=product.is_mobile;
    this.getSubCategories(this.product.category_id);
    this.product.subcategory_id=product.sub_category_id;
    this.editBit=true;
  }

  addProduct(){
    if(this.editBit){
      this._productService.updateProduct(this.product).subscribe(
        res=>{
          alert("Product is updated successfully");
          this.cancelProduct();
          this.setProduct();
        },
        err=>{
          alert("Product is not updated. Please try again later.");
        }
      )
    } else {
      this._productService.addProduct(this.product).subscribe(
        res=>{
          alert("Product is added successfully.");
          this.cancelProduct();
          this.setProduct();
        },err=>{
          alert("Product is not added successfully. Please try agin later.");
        }
      )
    }
  }

}
