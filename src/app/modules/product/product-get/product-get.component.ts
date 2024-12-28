import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SCIFService } from '../../shared/services/scif.service';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import {flattenJson} from '../../shared/data-table/data-table.component';
import { ProductService } from '../services/product.service';
import { ProductNotificationService } from '../services/product-notification-service.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit{
  protected products_list: any[] = [];
  protected products_property_name: any;
  protected products_headers: any;
  protected ogData: any;
  protected columnsToOmit = ['product_info'];
  protected rowSelected = new EventEmitter<any>();


  constructor(
    private productService: ProductService,
    private productNotification: ProductNotificationService
    ) {
      this.productNotification.onSuccess().subscribe(() => {
        this.loadData();
        console.log('Task completed successfully.');
      });
    }
  ngOnInit(): void {
    // productNotification
    this.loadData();

  }

  private loadData() {
    this.productService.getProductData().subscribe({
      next: (res) => {
        this.products_list = flattenJson(res);
        this.products_property_name = DataTableComponent.getProperties(
          this.products_list[0]
        );
        console.log(this.products_property_name);
        this.products_headers = this.products_property_name;
        this.ogData = this.products_list;
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
      this.products_list = this.ogData;
    } else {
      this.products_list.forEach((elem: any) => {
        let lCaseName = elem.Name.toLowerCase();
        let lCaseDesc = elem.Description.toLowerCase();
        if (
          lCaseName.indexOf(target.value.toLowerCase()) > -1 ||
          lCaseDesc.indexOf(target.value.toLowerCase()) > -1
        ) {
          newData.push(elem);
        }
      });
      this.products_list = newData;
    }
  }

  handleData(data: any) {
    this.productService.setSharedData(data);
    // this.rowSelected.emit(data);
  }

  getProductsList() {
    return this.products_list;
  }

}
