import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { FormsModule } from '@angular/forms';
import { CategoryImageComponent } from './category-image/category-image.component';


@NgModule({
  declarations: [AddCategoryComponent, AddSubCategoryComponent, CategoryImageComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule
  ]
})
export class CategoryModule { }
