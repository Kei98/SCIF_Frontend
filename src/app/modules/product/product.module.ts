import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductRoutingModule } from './product-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { SharedModule } from '../shared/shared.module';
import { TableTestComponent } from './table-test/table-test.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { SpecSheetAddComponent } from './spec-sheet-add/spec-sheet-add.component';
import { FormsModule } from '@angular/forms';
import { ProductCustomerComponent } from './product-customer/product-customer.component';
import { AuthModule } from '../auth/auth.module';
// import { DataTableComponent } from '../shared/data-table/data-table.component';



@NgModule({
  declarations: [
    ProductAddComponent,
    ProductGetComponent,
    TableTestComponent,
    ProductAdminComponent,
    SpecSheetAddComponent,
    ProductCustomerComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    AuthModule,
  ],
  exports: [
    ProductAddComponent
  ]
})
export class ProductModule { }
