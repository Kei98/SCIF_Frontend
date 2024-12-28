import { Component, EventEmitter, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { SupplierNotificationService } from '../services/supplier-notification.service';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { flattenJson } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-supplier-get',
  templateUrl: './supplier-get.component.html',
  styleUrls: ['./supplier-get.component.scss']
})
export class SupplierGetComponent implements OnInit {
  protected suppliers_list: any[] = [];
  protected suppliers_property_name: any;
  protected suppliers_headers: any;
  protected ogData: any;
  protected columnsToOmit = [];
  protected rowSelected = new EventEmitter<any>();


  constructor(
    private supplierService: SupplierService,
    private supplierNotification: SupplierNotificationService
    ) {
      this.supplierNotification.onSuccess().subscribe(() => {
        this.loadData();
        console.log('Task completed successfully.');
      });
    }
  ngOnInit(): void {
    this.loadData();

  }

  private loadData() {
    this.supplierService.getSupplier().subscribe({
      next: (res) => {
        this.suppliers_list = flattenJson(res);
        this.suppliers_property_name = DataTableComponent.getProperties(
          this.suppliers_list[0]
        );
        this.suppliers_headers = this.suppliers_property_name;
        this.ogData = this.suppliers_list;
      },
      error: (err) => {
        throw err;
      },
    });
  }
  searchFn(event: Event, keys = []) {
    let target = <HTMLInputElement>event.target;
    let newData: any = [];

    if (target.value.trim() == '') {
      this.suppliers_list = this.ogData;
    } else {
      this.suppliers_list.forEach((elem: any) => {
        let lCaseName = elem.Name.toLowerCase();
        let lCaseDesc = elem.ID_Card.toLowerCase();
        if (
          lCaseName.indexOf(target.value.toLowerCase()) > -1 ||
          lCaseDesc.indexOf(target.value.toLowerCase()) > -1
        ) {
          newData.push(elem);
        }
      });
      this.suppliers_list = newData;
    }
  }

  handleData(data: any) {
    this.supplierService.setSharedData(data);
    // this.rowSelected.emit(data);
  }

  getSuppliersList() {
    return this.suppliers_list;
  }
}
