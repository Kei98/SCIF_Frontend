import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportComponent } from './report/report.component';
import { FlexmonsterPivotModule } from 'ngx-flexmonster';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PurchaseSaleReportComponent } from './purchase-sale-report/purchase-sale-report.component';



@NgModule({
  declarations: [
    ReportComponent,
    PurchaseSaleReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FlexmonsterPivotModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
  ]
})
export class ReportsModule { }
