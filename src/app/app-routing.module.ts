import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "invoice",
    loadChildren: () =>
      import("./invoice/invoice.module").then(m => m.InvoiceModule)
  },
  {
    path: "report",
    loadChildren: () =>
      import("./outstanding/outstanding.module").then(m => m.OutstandingModule)
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
