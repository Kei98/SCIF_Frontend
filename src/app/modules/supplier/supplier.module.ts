import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierGetComponent } from './supplier-get/supplier-get.component';
import { SupplierAdminComponent } from './supplier-admin/supplier-admin.component';


@NgModule({
  declarations: [
    SupplierAddComponent,
    SupplierGetComponent,
    SupplierAdminComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class SupplierModule { }
