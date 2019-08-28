import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';

const routes: Routes = [
  {
    path: "",
    component: AddCategoryComponent
  },
  {
    path:"sub-category",
    component:AddSubCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
