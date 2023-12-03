import {
  Component,
  // ElementRef,
  Input,
  OnDestroy,
  OnInit,
  EventEmitter,
  Output,
  // ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';

import 'datatables.net';
import 'datatables.net-bs5';

declare var $:any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() columnstoOmit: any[] = [];
  @Output() rowSelected = new EventEmitter<any>();

  // @Input() searchParams: any[] = [];
  // @ViewChild('dataTable', { static: false }) table!: ElementRef;

  dtTrigger: Subject<any> = new Subject<any>();
  reverse: boolean = false;
  p: number = 1;

  // searchQuery: string = '';

  constructor() {} // private el: ElementRef
  
  ngOnInit() {
    this.columns = [];
    // this.dtOptions = {
    //   select: true,
    // };
  }

  ngAfterViewInit() {}

  // onPageChange(page: number): void {
  //   console.log('llego');
  // }

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

  sort(field: string) {
    if (this.reverse) {
      this.data.sort((a, b) => this.compare(a[field], b[field]));
    } else {
      this.data.sort((a, b) => this.compare(b[field], a[field]));
    }
  
    this.reverse = !this.reverse;
  }
  
  // Helper function for numerical and string comparisons
  private compare(a: any, b: any): number {
    if (this.isNumeric(a) && this.isNumeric(b)) {
      return a - b;
    } else {
      // Convert both values to strings for case-insensitive string comparison
      const strA = String(a).toLowerCase();
      const strB = String(b).toLowerCase();
      return strA.localeCompare(strB);
    }
  }

  isNumeric(value: any): boolean {
    // Using isNaN
    // return !isNaN(value);
  
    // Using Number.isNaN (more strict, doesn't coerce values)
    return !Number.isNaN(Number(value));
  }

  rowSelection(target: any) {
    // let target = <HTMLElement>event.target;
    // console.log(target);
    this.rowSelected.emit(target);
  }
  
}

export function flattenJson(jsonObj: any): FlattenedObject[] {
  return Object.keys(jsonObj).map((key) => {
    const flattened: FlattenedObject = {};

    function recursiveFlatten(obj: any, currentKey: string) {
      for (const nestedKey in obj) {
        if (obj.hasOwnProperty(nestedKey)) {
          if (typeof obj[nestedKey] === 'object' && obj[nestedKey] !== null) {
            // Recursively flatten nested objects
            recursiveFlatten(obj[nestedKey], nestedKey);
          } else {
            flattened[nestedKey] = obj[nestedKey];
          }
        }
      }
    }

    recursiveFlatten(jsonObj[key], key);
    return flattened;
  });
}

interface FlattenedObject {
  [key: string]: any;
}
