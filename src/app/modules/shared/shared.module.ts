import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    DataTableComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    FontAwesomeModule,
    NgxPaginationModule,
  ],
  exports: [
    DataTableComponent,
    NavbarComponent,
    NotFoundComponent,

  ]
})
export class SharedModule { }
