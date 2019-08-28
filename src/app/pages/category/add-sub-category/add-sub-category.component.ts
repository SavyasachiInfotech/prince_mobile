import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/mock/category.service';
import { Config } from 'src/app/core/data/config';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {

  categories;
  subCategories;
  category;
  editBit=false;
  
  constructor(private _categoryService:CategoryService,
              private _config:Config) {
                this.setSubCategory();
                this.cancelCategory();
              }

  ngOnInit() {
  }

  cancelCategory(){
    this.category={name:"",description:"",parent_id:1}
    this.editBit=false;
  }

  setSubCategory(){
    this._categoryService.getCategory(0).subscribe(
      res=>{
        //@ts-ignore
        if(res.status==200){
          //@ts-ignore
          this.categories=res.categories;
        }
      },err=>{
        alert(this._config.err);
      }
    );
    this._categoryService.getSubCategory(1,0).subscribe(
      res=>{
        //@ts-ignore
        if(res.status==200){
          //@ts-ignore
          this.subCategories=res.categories;
        }
      },err=>{
        alert(this._config.err);
      }
    );
  }

  changeCategory(){
    this._categoryService.getSubCategory(this.category.parent_id,0).subscribe(
      res=>{
        //@ts-ignore
        if(res.status==200){
          //@ts-ignore
          this.subCategories=res.categories;
        }
      },err=>{
        alert(this._config.err);
      }
    );
  }

  editCategory(category){
    this.category=category;
    this.editBit=true;
  }

  saveCategory(){
    if(this.category.name!=''){
      if(this.editBit){
        this._categoryService.editSubCategory(this.category).subscribe(
          res=>{
            alert("Sub category updated successfully");
            this.cancelCategory();
            this.setSubCategory();
          },err=>{
            alert(this._config.err);
          }
        )
      } else {
        this._categoryService.addSubCategory(this.category).subscribe(
          res=>{
            alert("Sub category added successfully");
            this.cancelCategory();
            this.setSubCategory();
          },err=>{
            alert(this._config.err);
          }
        )
      }
    } else {
      alert("Enter the data properly.")
    }
  }

}
