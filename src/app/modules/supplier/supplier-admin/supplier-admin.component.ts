import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-admin',
  templateUrl: './supplier-admin.component.html',
  styleUrls: ['./supplier-admin.component.scss']
})
export class SupplierAdminComponent {
  protected selectedRow:any = 0;

  passInfoToAdd(data:any) {
    console.log('llega al admin supplier');
    console.log(data);
    this.selectedRow = data;
  }
}
