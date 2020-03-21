import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CodChargeRoutingModule } from "./cod-charge-routing.module";
import { ChangeCodComponent } from "./change-cod/change-cod.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ChangeCodComponent],
  imports: [CommonModule, CodChargeRoutingModule, FormsModule]
})
export class CodChargeModule {}
