import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CheckOutComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
