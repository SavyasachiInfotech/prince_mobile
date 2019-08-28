import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAttributeComponent } from "./add-attribute/add-attribute.component";
import { AddAttributeValueComponent } from './add-attribute-value/add-attribute-value.component';

const routes: Routes = [
  {
    path: "",
    component: AddAttributeComponent
  },
  {
    path:"attribute-value",
    component:AddAttributeValueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule {}
