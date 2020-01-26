import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PromocodeRoutingModule } from "./promocode-routing.module";
import { PromocodeListComponent } from "./promocode-list/promocode-list.component";
import { AddPromocodeComponent } from "./add-promocode/add-promocode.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PromocodeListComponent, AddPromocodeComponent],
  imports: [CommonModule, PromocodeRoutingModule, FormsModule]
})
export class PromocodeModule {}
