import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductRoutingModule } from './product-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';


@NgModule({
  declarations: [
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    ProductAddComponent
  ]
})
export class ProductModule { }
