import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductVariantComponent } from './product-variant/product-variant.component';
import { AddImagesComponent } from './add-images/add-images.component';


const routes: Routes = [
  {
    path:"add-product",
    component:AddProductComponent
  },
  {
    path:"add-variant/:id",
    component:ProductVariantComponent
  },
  {
    path:"add-image/:id",
    component:AddImagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
