import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangeCodComponent } from "./change-cod/change-cod.component";

const routes: Routes = [
  {
    path: "change",
    component: ChangeCodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodChargeRoutingModule {}
