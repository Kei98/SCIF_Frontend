import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { share } from 'rxjs';
import { SaleComponent } from './sale/sale.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent,
    SaleComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SalesModule { }
