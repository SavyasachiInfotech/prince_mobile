import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageSpecificationComponent } from "./manage-specification/manage-specification.component";
import { AddSpecificationComponent } from "./add-specification/add-specification.component";

const routes: Routes = [
  {
    path: "manage-specifications",
    component: ManageSpecificationComponent
  },
  {
    path: "add-specification/:id",
    component: AddSpecificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificationsRoutingModule {}
