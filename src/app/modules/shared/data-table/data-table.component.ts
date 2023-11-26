import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  // ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';

// import * as $ from 'jquery';

//declare var $:any;
// import 'datatables.net';
// import 'datatables.net-bs5';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // @ViewChild('dataTable', { static: false }) table!: ElementRef;

  private dataTable: any;

  // searchQuery: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.columns = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  ngAfterViewInit() {
    this.initializeDataTable();
  }

  ngOnDestroy() {
    // if (this.dataTable) {
    //   this.dataTable.destroy();
    // }
    this.dtTrigger.unsubscribe();
  }

  private initializeDataTable() {
    // if (typeof $ !== 'undefined') {
    //   // this.dataTable.forEach((jsonObj:any) => {
    //   //   const { propertyNames, propertyValues } = this.separateValuesFromProperties(jsonObj);
    //   //   this.columns = propertyNames;
    //   //   this.data = propertyValues;
    //   // });
    if (typeof $ !== 'undefined') {
      this.dataTable = $(this.el.nativeElement)
        .find('table')
        .DataTable({
          searching: true,
          // sorting: true,
          data: this.data,
          columns: this.columns.map((col) => ({ data: col, aDataSort: col.indexOf(col) })),
        });
    } else {
      console.error('jQuery is not defined. Make sure it is properly loaded.');
    }
  }

  // performSearch(query: string = this.searchQuery) {
  //   if (this.dataTable) {
  //     console.log(this.dataTable.search(query));
  //   }
  // }

  static getProperties(jsonObj: any) {
    const propertyNames: string[] = Object.keys(jsonObj);

    return propertyNames;
  }

  static getValues(jsonObj: any) {
    const propertyValues: any[] = Object.values(jsonObj);

    return propertyValues;
  }

  // separateValuesFromProperties(jsonObj: any): { propertyNames: string[], propertyValues: any[] } {
  //   const propertyNames = Object.keys(jsonObj);
  //   const propertyValues = Object.values(jsonObj);

  //   return { propertyNames, propertyValues };
  // }
}
