import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BlockUserComponent } from './block-user/block-user.component';


@NgModule({
  declarations: [BlockUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
