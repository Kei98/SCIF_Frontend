import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SCIFService } from '../../shared/services/scif.service';
// import { DataTableComponent } from '../../shared/data-table/data-table.component';
import {
  faPlus,
  faTrash,
  faPenToSquare,
  faEraser
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
//, OnChanges
export class ProductAddComponent implements OnInit {
  protected addSpecButton = true;
  protected formSpecSheet = true;
  icon = faMagnifyingGlass;
  faPlus = faPlus;
  faTrash = faTrash;
  faPentoSquare = faPenToSquare;
  faEraser = faEraser;
  protected prod_sheet_list: any;
  protected id = 0;
  // protected isActive: boolean = true;
  // @Input() selectedRow = [];
  receivedData: any = null;
  
  protected inputsDataNull:any = {
    Active: null,
    Cost: null,
    Description: null,
    ID: null,
    Image: null,
    Name: null,
    Price: null,
    Quantity: null,
    Spec: null,
    product_info: null,
  };
  protected inputsData: any = {... this.inputsDataNull};
  // protected products_list: any[] = [];
  // protected products_property_name: any;
  // protected ogData: any;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getProductSheetData().subscribe({
      next: (res) => {
        this.prod_sheet_list = res;
      },
      error: (err) => {
        throw err;
      },
    });

    this.productService.sharedData$.subscribe((data) => {
      this.receivedData = data;
      this.fillInputsData(this.receivedData);
    });
    (document.getElementById('Active') as HTMLInputElement).checked = true;

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
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.fillInputs(changes);
  // }

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
    let input = document.getElementById('Spec');
    return input;
  }

  setSpecSheetVal(value: any) {
    let input = document.getElementById('Spec');
    input?.setAttribute('data-key', value.product_spec_sheet_id);
    (input as HTMLInputElement).value = value.product_spec_sheet_name;

    // let selectedKey = input?.getAttribute('data-key');
    // console.log('selectedKey');
    // console.log(selectedKey);
  }
  createSpecSheet() {
    let input = this.getSpecSheet();
    // call component spec sheet
    this.formSpecSheet = false;
    (input as HTMLInputElement).disabled = true;

    this.showDropDown();
  }

  specSelected(spec_selected: any) {
    this.setSpecSheetVal(spec_selected);
    this.showDropDown();
  }

  filterFunction() {
    let input = document.getElementById('Spec');
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
      this.addSpecButton = false;
    } else {
      this.addSpecButton = true;
    }
  }

  fillInputsData(data: any) {

    // console.log('this.inputsDataNull');
    // console.log(this.inputsDataNull);
    // console.log('llega al add');
    // console.log(data);
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.inputsData[key] = data[key];
      }
    }
    this.checkInputsData(data);    
    // console.log('inputsData');
    // console.log(this.inputsData);
    this.fillInputs();
    this.disableButtons();
  }

  fillInputs() {
    let HTMLElemets = this.getInputs();
    let active = document.getElementById('Active');
    for (let key in HTMLElemets) {
      if (HTMLElemets.hasOwnProperty(key)) {
        // this.inputsData[key] = HTMLElemets[key];
        (HTMLElemets[key] as HTMLInputElement).value = this.inputsData[key];
      }
    }
    
    if (
      this.inputsData['Active'] != null &&
      this.inputsData['Active'].toLowerCase() != this.checkActive(active).toString()
    ) {
      this.toggleActive(active);
    }
    
    this.id = this.inputsData['ID'];
    // console.log(this.id);
    this.cdr.detectChanges();
  }

  private getInputs() {
    let HTMLElemets: any = {
      ID: document.getElementById('ID'),
      Name: document.getElementById('Name'),
      Description: document.getElementById('Description'),
      Image: document.getElementById('Image'),
      Quantity: document.getElementById('Quantity'),
      Cost: document.getElementById('Cost'),
      Price: document.getElementById('Price'),
      Spec: this.getSpecSheet(),
      Active: document.getElementById('Active'),
    };
    return HTMLElemets;
  }

  private checkInputsData(data: any) {
    if (data.hasOwnProperty('Info') && !data['Info']) {
      this.inputsData['Quantity'] = null;
      this.inputsData['Cost'] = null;
      this.inputsData['Price'] = null;
    }
  }

  checkActive(checkbox: any) {
    return (checkbox as HTMLInputElement).checked;
  }

  toggleActive(checkbox: any) {
    (checkbox as HTMLInputElement).checked = !(checkbox as HTMLInputElement)
      .checked;
  }

  clearInputsData() {
    this.fillInputsData(this.inputsDataNull);
  }

  disableButtons() {
    let addButton = document.getElementById('addButton');
    let editButton = document.getElementById('editButton');
    let deleteButton = document.getElementById('deleteButton');
    
    if (this.id == null || this.id == 0) {
      (addButton as HTMLButtonElement).disabled = false;
      (editButton as HTMLButtonElement).disabled = true;
      (deleteButton as HTMLButtonElement).disabled = true;
    } else {
      (addButton as HTMLButtonElement).disabled = true;
      (editButton as HTMLButtonElement).disabled = false;
      (deleteButton as HTMLButtonElement).disabled = false;
    }
  }

  addProduct() {
    let HTMLElemets = this.getInputs();
    // if ((HTMLElemets['Name'] as HTMLInputElement).value == null) {
    //   console.log('es null');
    // } else if((HTMLElemets['Name'] as HTMLInputElement).value == ''){
    //   console.log('es comillas');
    // }
    if((HTMLElemets['Name'] as HTMLInputElement).value != ''){
      // console.log((HTMLElemets['Name'] as HTMLInputElement).value);
      if(HTMLElemets['Quantity'] != null && HTMLElemets['Cost'] != null && HTMLElemets['Price'] != null) {
        // Call product_info add
      }
      let spec = HTMLElemets['Spec'];
      (spec as HTMLInputElement).value = spec.getAttribute('data-key');
      let active = HTMLElemets['Active'];
      (active as HTMLInputElement).value = active.checked;
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
          if (key == 'Spec') {
            HTMLElemets[key] = Number(HTMLElemets[key].value);
            console.log('HTMLElemets[Spec]');
            console.log(HTMLElemets[key]);
            if (typeof HTMLElemets[key] === 'number') {
              console.log('number');
            } else {
              console.log(typeof HTMLElemets[key]);
            }
          } else {
            HTMLElemets[key] = HTMLElemets[key].value;  
          }
          
          // console.log(key);
          // console.log(HTMLElemets[key]);
          // if(HTMLElemets[key] == ''){
          //   console.log('comillas');
          //   // console.log(HTMLElemets[key]);
          //   HTMLElemets[key] = null;
          //   if (HTMLElemets[key] == null) {
          //     console.log('pasado a null');
          //   }
          // 
        }
      }
      // HTMLElemets['Spec'] = HTMLElemets['spec'].value as number;
      // console.log('HTMLElemets[Spec]');
      // console.log(HTMLElemets['Spec']);
      this.productService.addProduct(HTMLElemets).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          throw err;
        },
      });
    }else {
      console.log('alert');
      alert('Name is required');
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
