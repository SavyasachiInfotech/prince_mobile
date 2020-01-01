import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificationsRoutingModule } from './specifications-routing.module';
import { ManageSpecificationComponent } from './manage-specification/manage-specification.component';
import { AddSpecificationComponent } from './add-specification/add-specification.component';


@NgModule({
  declarations: [ManageSpecificationComponent, AddSpecificationComponent],
  imports: [
    CommonModule,
    SpecificationsRoutingModule
  ]
})
export class SpecificationsModule { }
