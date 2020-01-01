import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../theme/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    loadChildren: () =>
      import("../theme/theme.module").then(m => m.ThemeModule),
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
        path: "mobile",
        loadChildren: () =>
          import("./mobile/mobile.module").then(m => m.MobileModule)
      },
      {
        path: "product",
        loadChildren: () =>
          import("./product/product.module").then(m => m.ProductModule)
      },
      {
        path: "order",
        loadChildren: () =>
          import("./order/order.module").then(m => m.OrderModule)
      },
      {
        path: "specifications",
        loadChildren: () =>
          import("./specifications/specifications.module").then(
            m => m.SpecificationsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
