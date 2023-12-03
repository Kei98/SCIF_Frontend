import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent {
  protected selectedRow:any = 0;

  passInfoToAdd(data:any) {
    console.log('llega al admin');
    console.log(data);
    this.selectedRow = data;
  }
}
