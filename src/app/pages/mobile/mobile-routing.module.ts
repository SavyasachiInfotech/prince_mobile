import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMobileComponent } from './add-mobile/add-mobile.component';
import { AddBrandComponent } from './add-brand/add-brand.component';


const routes: Routes = [
  {
    path:"",
    component:AddMobileComponent
  },
  {
    path:"brand",
    component:AddBrandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
