import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttributeRoutingModule } from './attribute-routing.module';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { AddAttributeValueComponent } from './add-attribute-value/add-attribute-value.component';


@NgModule({
  declarations: [AddAttributeComponent, AddAttributeValueComponent],
  imports: [
    CommonModule,
    AttributeRoutingModule,
    FormsModule
  ]
})
export class AttributeModule { }
