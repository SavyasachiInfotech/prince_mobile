import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { ProductVariantComponent } from './product-variant/product-variant.component';
import { AddImagesComponent } from './add-images/add-images.component';


@NgModule({
  declarations: [AddProductComponent, ProductVariantComponent, AddImagesComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ]
})
export class ProductModule { }
