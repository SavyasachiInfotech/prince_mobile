import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../theme/theme.module';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThemeModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
