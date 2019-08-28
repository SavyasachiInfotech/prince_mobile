import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../theme/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "category",
        loadChildren: () =>
          import("./category/category.module").then(m => m.CategoryModule)
      },
      {
        path: "attribute",
        loadChildren: () =>
          import("./attribute/attribute.module").then(m => m.AttributeModule)
      },
      {
        path:"mobile",
        loadChildren:()=>import("./mobile/mobile.module").then(m=>m.MobileModule)
      },
      {
        path:"product",
        loadChildren:()=>import("./product/product.module").then(m=>m.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
