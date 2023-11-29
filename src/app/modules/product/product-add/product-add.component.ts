import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SCIFService } from '../../shared/services/scif.service';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  protected createNew = true;
  icon = faMagnifyingGlass;
  faPlus = faPlus;
  faTrash = faTrash;
  faPentoSquare = faPenToSquare;
  protected prod_sheet_list: any;
  // protected products_list: any[] = [];
  // protected products_property_name: any;
  // protected ogData: any;

  constructor(protected scif: SCIFService) {}

  ngOnInit(): void {
    this.scif.getProductSheetData().subscribe({
      next: (res) => {
        this.prod_sheet_list = res;
      },
      error: (err) => {
        throw err;
      },
    });

    // this.scif.getProductData().subscribe({
    //   next: (res) => {
    //     this.products_list = res;
    //     this.products_property_name = DataTableComponent.getProperties(
    //       this.products_list[0]
    //     );
    //     this.ogData = this.products_list;
    //   },
    //   error: (err) => {
    //     throw err;
    //   },
    // });
  }

  onFocus(event: Event) {
    let target = event.target as HTMLElement;
    let parent = target.parentElement;
    parent?.classList.add('pretty-border');
  }

  onBlur(event: Event) {
    let target = event.target as HTMLElement;
    let parent = target.parentElement;
    parent?.classList.remove('pretty-border');
  }

  showDropDown() {
    let dropdown = document.getElementById('myDropdown');

    if (dropdown?.classList.contains('show')) {
      dropdown?.classList.remove('show');
      dropdown?.classList.add('dropdown-content');
    } else {
      dropdown?.classList.remove('dropdown-content');
      dropdown?.classList.add('show');
    }
  }

  getSpecSheet() {
    let input = document.getElementById('myInput');
    return input;
  }

  setSpecSheetVal(value: any) {
    let input = document.getElementById('myInput');
    (input as HTMLInputElement).value = value;
  }
  createSpecSheet() {
    let input = this.getSpecSheet();
    // call component spec sheet
    (input as HTMLInputElement).disabled = true;

    this.showDropDown();
  }

  specSelected(spec_selected: any) {
    this.setSpecSheetVal(spec_selected);
    this.showDropDown();
  }

  filterFunction() {
    let input = document.getElementById('myInput');
    let list = document.getElementById('dpList');
    let listChildren = list?.getElementsByTagName('li');

    let listChildrenLen = listChildren?.length;
    let nonExistantCount = 0;

    let value = (input as HTMLInputElement).value.toUpperCase();

    Array.from(listChildren!).forEach((elem) => {
      if (elem.innerHTML.toUpperCase().indexOf(value) > -1) {
        (elem as HTMLElement).style.display = '';
      } else {
        (elem as HTMLElement).style.display = 'none';
        nonExistantCount++;
      }
    });

    if (nonExistantCount == listChildrenLen) {
      this.createNew = false;
    } else {
      this.createNew = true;
    }
  }

  // searchFn(event: Event, keys = []) {
  //   let target = <HTMLInputElement>event.target;
  //   let newData: any = [];

  //   if (target.value.trim() == '') {
  //     this.products_list = this.ogData;
  //   } else {
  //     this.products_list.forEach((elem: any) => {
  //       let lCaseName = elem.product_name.toLowerCase();
  //       let lCaseDesc = elem.product_description.toLowerCase();
  //       if (
  //         lCaseName.indexOf(target.value.toLowerCase()) > -1 ||
  //         lCaseDesc.indexOf(target.value.toLowerCase()) > -1
  //       ) {
  //         newData.push(elem);
  //       }
  //     });
  //     this.products_list = newData;
  //   }
  // }
}
