import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';

import 'datatables.net';
import 'datatables.net-bs5';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  
  // @Input() searchParams: any[] = [];
  // @ViewChild('dataTable', { static: false }) table!: ElementRef;
  
  dtTrigger: Subject<any> = new Subject<any>();
  reverse:boolean = false;
  p:number = 1;

  
  // searchQuery: string = '';

  constructor(
    // private el: ElementRef
    ) {}

  ngOnInit() {
    this.columns = [];
  }

  ngAfterViewInit() {
    
  }

  onPageChange(page: number): void {
    console.log('llego');
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  static getProperties(jsonObj: any) {
    const propertyNames: string[] = Object.keys(jsonObj);

    return propertyNames;
  }

  static getValues(jsonObj: any) {
    const propertyValues: any[] = Object.values(jsonObj);

    return propertyValues;
  }

  sort(field:string) {
    if(this.reverse) {
      this.data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      this.reverse = !this.reverse;
    }else {
      this.data.sort((a, b) => (a[field] < b[field] ? 1 : -1));
      this.reverse = !this.reverse;
    }
  }

}
