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
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { ProductNotificationService } from '../services/product-notification-service.service';
import { isEmpty } from 'rxjs';
import { isEmptyObject } from 'jquery';


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
  protected id = 2;
  // protected isActive: boolean = true;
  // @Input() selectedRow = [];
  receivedData: any = null;
  protected selectedSepec: any = null;

  protected inputsDataNull: any = {
    Active: 'true',
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
  protected inputsData: any = { ...this.inputsDataNull };
  // protected products_list: any[] = [];
  // protected products_property_name: any;
  // protected ogData: any;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private productNotification: ProductNotificationService
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
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.fillInputs(changes);
  // }

  onFocus(event: Event) {
    let target = event.target as HTMLElement;
    let parent = target.parentElement;
    parent?.classList.add('pretty-border');
    // let dropdown = document.getElementById('myDropdown');
    // dropdown?.classList.add('show');
    // dropdown?.classList.remove('dropdown-content');
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
    // this.selectedSepec = spec_selected.product_spec_sheet_id;
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
    // console.log('this.inputsDataNull 2');
    // console.log(this.inputsDataNull);
    // console.log('llega al add 2');
    // console.log(data);
    // console.log('inputsData');
    // console.log(this.inputsData);
    if (data != this.inputsDataNull && data != undefined && data != null && data != '') {
      this.setDataKeySelected(data.Spec);
    }
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
      this.inputsData['Active'].toLowerCase() !=
        this.checkActive(active).toString()
    ) {
      this.toggleActive(active);
    }
    // if (this.receivedData.spec != undefined) {
    //   this.setDataKeySelected(this.receivedData.Spec.value);
    // }
    this.id = this.inputsData['ID'];
    let spec = document.getElementById('Spec');
    if (spec != undefined) {
      spec.setAttribute('data-key', this.selectedSepec);
    }
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
    this.selectedSepec = 0;
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
    let info = false;
    if ((HTMLElemets['Name'] as HTMLInputElement).value.trim() != '') {
      if (
        HTMLElemets['Quantity'] != null ||
        HTMLElemets['Cost'] != null ||
        HTMLElemets['Price'] != null
      ) {
        info = true;
        // Call product_info add
      }
      let spec = HTMLElemets['Spec'].getAttribute('data-key');
      let active = HTMLElemets['Active'];
      (active as HTMLInputElement).value = active.checked;
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
          if (key == 'Spec') {
            HTMLElemets[key] = Number(spec);
          }
          else if(key != 'ID' && key != 'Spec' && key != 'Quantity' && key != 'Cost' && key != 'Price') {
            HTMLElemets[key] = HTMLElemets[key].value;
          }
        }
      }
      let preparedObj = this.toActualNames(HTMLElemets);
      this.productService.addProduct(preparedObj).subscribe({
        next: (res) => {
          if (res.status === 201) {
            HTMLElemets['ID'].value = res.body['product_id'];
            if(info) {
              let infoData = this.compareOldAndActualData(['Quantity', 'Cost', 'Price'], 
              {}, HTMLElemets, HTMLElemets['ID'].value, 'Info');
              this.addProductInfoService(this.toActualNames(infoData));
            }
            this.productNotification.notifySuccess();
          }
        },
        error: (err) => {
          console.log(err.error);
          throw err;
        },
      });
    } else {
      console.log('alert');
      alert('Name is required');
    }
  }

  toActualNames(object: any) {
    const {
      Active: product_active,
      Description: product_description,
      ID: product_id,
      Image: product_image,
      Name: product_name,
      Spec: product_spec_sheet,
      Quantity: product_info_quantity,
      Cost: product_info_cost,
      Price: product_info_price,
      Info: product_info,
      // SpecName: product_spec_sheet_name,
      // SpecDir: product_spec_sheet_dir,
      // SpecActive: product_spec_sheet_active,
    } = object;

    const actualObject = {
      product_id,
      product_name,
      product_description,
      product_image,
      product_active,
      product_spec_sheet,
      product_info_quantity,
      product_info_cost,
      product_info_price,
      product_info,
    };

    return actualObject;
  }

  editProduct() {
    let HTMLElemets = this.getInputs();
    if ((HTMLElemets['Name'] as HTMLInputElement).value.trim() != '') {
      if (
        HTMLElemets['Quantity'] != null &&
        HTMLElemets['Cost'] != null &&
        HTMLElemets['Price'] != null
      ) {
        let idProdInfo = 0;
        if (this.receivedData['product_info'] != null) {
          idProdInfo = this.receivedData['product_info'];
        }
        let editedProductInfo = this.compareOldAndActualData(['Quantity', 'Cost', 'Price'], 
        this.receivedData, HTMLElemets, idProdInfo, 'product_info');
        // console.log(editedProductInfo);
        let prodInfo = this.toActualNames(editedProductInfo);
        if (idProdInfo == 0) {
          prodInfo['product_info'] = HTMLElemets['ID'].value;
          this.addProductInfoService(prodInfo);
        }else {
          this.editProductInfoService(idProdInfo, prodInfo);
        }
      }
      let spec = HTMLElemets['Spec'].getAttribute('data-key');
      let active = HTMLElemets['Active'];
      (active as HTMLInputElement).value = active.checked;
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
          if (key == 'Spec') {
            HTMLElemets[key] = Number(spec);
          } else {
            HTMLElemets[key] = HTMLElemets[key].value;
          }
        }
      }
      let preparedObj = this.toActualNames(HTMLElemets);
      console.log(preparedObj);
      this.productService.editProduct(this.id, preparedObj).subscribe({
        next: (res) => {
          if (res.status === 202) {
            this.productNotification.notifySuccess();
          }
        },
        error: (err) => {
          console.log(err.error);
          throw err;
        },
      });
    }
  }
  
  deleteProduct() {
    if (this.id > 0) {
      this.productService.deleteProduct(this.id).subscribe({
        next: (res) => {
          if (res.status === 202) {
            console.log(res);
            this.productNotification.notifySuccess();
            (document.getElementById('Active') as HTMLInputElement).checked = false;
          }
        },
        error: (err) => {
          console.log(err.error);
          throw err;
        },
      });
    }
  }
  setDataKeySelected(name:string) {
    let foundKey = Object.keys(this.prod_sheet_list).find((k) => 
    this.prod_sheet_list[k]['product_spec_sheet_name'] === name);
    if (foundKey != undefined) {
      let datakey = this.prod_sheet_list[foundKey]['product_spec_sheet_id'];
      this.selectedSepec = datakey;
    }
  }

  compareOldAndActualData(compareFields:Array<any>, oldData:any, actualData:any, idData:any, idKey:any) {
    // console.log('actualData');
    // console.log(actualData);
    let updatedData = {};
    for (const key in actualData) {
      // console.log('key.toString()');
      // console.log(key.toString());
      if (compareFields.find((val) => val==key.toString())) {
        
        // console.log('key.toString()');
        // console.log(key.toString());
        // console.log(oldData.hasOwnProperty(key));
        // console.log('oldData.hasOwnProperty(key)');
        // if (oldData.hasOwnProperty(key) && actualData.hasOwnProperty(key)) {
          const oldElement = oldData[key];
          const newElement = actualData[key].value;
          // console.log('oldElement');
          // console.log(oldElement);
          // console.log('newElement');
          // console.log(newElement);
          if (oldElement != newElement) {
            // console.log('newElement');
            updatedData = {... updatedData, [key]:newElement};
          }
        // }  
      }
      
    }
    if (!isEmptyObject(updatedData)) {
      updatedData = {... updatedData, [idKey]: idData}
    }
    // console.log('updatedData');
    // console.log(updatedData);
    return updatedData;
  }

  addProductInfoService(prodInfo:any) {
    this.productService.addProductInfo(prodInfo).subscribe({
      next:(res) => {
        if (res.status === 201) {
          this.productNotification.notifySuccess();
        }
        else {
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err.error);
        throw err;
      },
    });
  }

  editProductInfoService(idProdInfo:any, prodInfo:any) {
    this.productService.editProductInfo(idProdInfo, prodInfo).subscribe({
      next: (res) => {
        if (res.status === 202) {
          this.productNotification.notifySuccess();
        }
      },
      error: (err) => {
        console.log(err.error);
        throw err;
      },
    });
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
