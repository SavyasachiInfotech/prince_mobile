import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddSubCategoryComponent } from "./add-sub-category/add-sub-category.component";
import { CategoryImageComponent } from "./category-image/category-image.component";

const routes: Routes = [
  {
    path: "",
    component: AddCategoryComponent
  },
  {
    path: "sub-category",
    component: AddSubCategoryComponent
  },
  {
    path: "image-upload/:id",
    component: CategoryImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
