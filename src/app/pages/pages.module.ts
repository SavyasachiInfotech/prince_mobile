import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../theme/theme.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule, ThemeModule]
})
export class PagesModule {}
