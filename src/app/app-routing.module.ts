import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "invoice",
    loadChildren: () =>
      import("./invoice/invoice.module").then(m => m.InvoiceModule)
  },
  {
    path: "",
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
