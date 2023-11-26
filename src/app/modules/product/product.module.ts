import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductRoutingModule } from './product-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { SharedModule } from '../shared/shared.module';
// import { DataTableComponent } from '../shared/data-table/data-table.component';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductGetComponent,

  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    ProductAddComponent
  ]
})
export class ProductModule { }
