import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { TableTestComponent } from './table-test/table-test.component';

const routes: Routes = [
  {
    path: 'add',
    component: ProductAddComponent
  },
  {
    path: 'test',
    component: TableTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
