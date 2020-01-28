import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlockUserComponent } from "./block-user/block-user.component";

const routes: Routes = [
  {
    path: "block-user",
    component: BlockUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
