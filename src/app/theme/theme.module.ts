import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [HeaderComponent, LayoutComponent, FooterComponent, SideBarComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule
  ]
})
export class ThemeModule { }
