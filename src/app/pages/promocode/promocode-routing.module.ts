import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PromocodeListComponent } from "./promocode-list/promocode-list.component";
import { AddPromocodeComponent } from "./add-promocode/add-promocode.component";

const routes: Routes = [
  {
    path: "manage-promocode",
    component: PromocodeListComponent
  },
  {
    path: "add-promocode/:id",
    component: AddPromocodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocodeRoutingModule {}
