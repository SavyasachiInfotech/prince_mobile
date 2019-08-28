import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMobileComponent } from './add-mobile/add-mobile.component';


const routes: Routes = [
  {
    path:"",
    component:AddMobileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
