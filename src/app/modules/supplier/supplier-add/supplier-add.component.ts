import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  faPlus,
  faTrash,
  faPenToSquare,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import { SupplierService } from '../services/supplier.service';
import { isEmptyObject } from 'jquery';
import { SupplierNotificationService } from '../services/supplier-notification.service';


@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
//, OnChanges
export class SupplierAddComponent implements OnInit {
  icon = faMagnifyingGlass;
  faPlus = faPlus;
  faTrash = faTrash;
  faPentoSquare = faPenToSquare;
  faEraser = faEraser;
  protected id = 2;
  receivedData: any = null;

  protected inputsDataNull: any = {
    supplier_active: 'true',
    supplier_id_card: null,
    supplier_name: null,
    supplier_id: null,
    supplier_comment: null
  };
  protected inputsData: any = { ...this.inputsDataNull };
  // protected products_list: any[] = [];
  // protected products_property_name: any;
  // protected ogData: any;

  constructor(
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef,
    private supplierNotification: SupplierNotificationService
  ) {}

  ngOnInit(): void {
    this.supplierService.sharedData$.subscribe((data) => {
      this.receivedData = data;
      this.fillInputsData(this.receivedData);
    });
    (document.getElementById('supplier_active') as HTMLInputElement).checked = true;
  }

  // onFocus(event: Event) {
  //   let target = event.target as HTMLElement;
  //   let parent = target.parentElement;
  //   parent?.classList.add('pretty-border');
  // }

  // onBlur(event: Event) {
  //   let target = event.target as HTMLElement;
  //   let parent = target.parentElement;
  //   parent?.classList.remove('pretty-border');
  // }

  private getInputs() {
    let HTMLElemets: any = {
      supplier_id: document.getElementById('supplier_id'),
      supplier_id_card: document.getElementById('supplier_id_card'),
      supplier_name: document.getElementById('supplier_name'),
      supplier_active: document.getElementById('supplier_active'),
      supplier_comment: document.getElementById('supplier_comment')
    };
    return HTMLElemets;
  }

  checkActive(checkbox: any) {
    return (checkbox as HTMLInputElement).checked;
  }

  toggleActive(checkbox: any) {
    (checkbox as HTMLInputElement).checked = !(checkbox as HTMLInputElement)
      .checked;
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
    // this.checkInputsData(data);
    // console.log('this.inputsDataNull 2');
    // console.log(this.inputsDataNull);
    // console.log('llega al add 2');
    // console.log(data);
    // console.log('inputsData');
    // console.log(this.inputsData);
    // if (data != this.inputsDataNull && data != undefined && data != null && data != '') {
    //   this.setDataKeySelected(data.Spec);
    // }
    this.fillInputs();
    this.disableButtons();
  }

  fillInputs() {
    let HTMLElemets = this.getInputs();
    let active = document.getElementById('supplier_active');
    for (let key in HTMLElemets) {
      if (HTMLElemets.hasOwnProperty(key)) {
        // this.inputsData[key] = HTMLElemets[key];
        (HTMLElemets[key] as HTMLInputElement).value = this.inputsData[key];
      }
    }
    if (
      this.inputsData['supplier_active'] != null &&
      this.inputsData['supplier_active'].toString().toLowerCase() !=
        this.checkActive(active).toString()
    ) {
      this.toggleActive(active);
    }
    this.id = this.inputsData['supplier_id'];
    this.cdr.detectChanges();
  }

  clearInputsData() {
    this.fillInputsData(this.inputsDataNull);
  }

  addSupplier() {
    let HTMLElemets = this.getInputs();
    console.log(HTMLElemets);
    if((HTMLElemets['supplier_id_card'] as HTMLInputElement).value.trim() != '' && (HTMLElemets['supplier_name'] as HTMLInputElement).value.trim() != '') {
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
          if(key != 'supplier_id') {
            HTMLElemets[key] = HTMLElemets[key].value;
          }
        }
      }
      // let preparedObj = this.toActualNames(HTMLElemets);
      this.supplierService.addSupplier(HTMLElemets).subscribe({
        next: (res) => {
          if (res.status === 201) {
            HTMLElemets['supplier_id'].value = res.body['supplier_id'];
            this.supplierNotification.notifySuccess();
          }
        },
        error: (err) => {
          console.log(err.error);
          throw err;
        },
      });
    }
    else {
      console.log('alert');
      alert('La cedula y el nombresonr requeridos');
    }
 }

  toActualNames(object: any) {
    const {
      supplier_id: supplier_id,
      supplier_id_card: supplier_id_card,
      supplier_name: supplier_name,
      supplier_active: supplier_active,
      supplier_comment: supplier_comment
    } = object;

    const actualObject = {
      supplier_id,
      supplier_id_card,
      supplier_name,
      supplier_active,
      supplier_comment
    };

    return actualObject;
  }

  editSupplier() {
    let HTMLElemets = this.getInputs();
    console.log(HTMLElemets);
    if((HTMLElemets['supplier_id_card'] as HTMLInputElement).value.trim() != '' && (HTMLElemets['supplier_name'] as HTMLInputElement).value.trim() != '') {
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
          // if(key != 'supplier_id') {
            HTMLElemets[key] = HTMLElemets[key].value;
          // }
        }
      }
      // let preparedObj = this.toActualNames(HTMLElemets);
      console.log('this.id');
      console.log(this.id);
      this.supplierService.editSupplier(this.id, HTMLElemets).subscribe({
        next: (res) => {
          if (res.status === 202) {
            this.supplierNotification.notifySuccess();
            console.log('Success');
          }
        },
        error: (err) => {
          console.log(err.error);
          throw err;
        },
      });
    }
    else {
      console.log('alert');
      alert('La cedula y el nombre son requeridos');
    }
 }

  deleteSupplier() {
    if (this.id > 0) {
      this.supplierService.deleteSupplier(this.id).subscribe({
        next: (res) => {
          if (res.status === 202) {
            console.log(res);
            this.supplierNotification.notifySuccess();
            (document.getElementById('supplier_active') as HTMLInputElement).checked = false;
          }
        },
        error: (err) => {
          console.log(err.error);
          throw err;
        },
      });
    }
  }

  compareOldAndActualData(compareFields:Array<any>, oldData:any, actualData:any, idData:any, idKey:any) {
    let updatedData = {};
    for (const key in actualData) {
      if (compareFields.find((val) => val==key.toString())) {

          const oldElement = oldData[key];
          const newElement = actualData[key].value;
          if (oldElement != newElement) {
            updatedData = {... updatedData, [key]:newElement};
          }
        // }
      }

    }
    if (!isEmptyObject(updatedData)) {
      updatedData = {... updatedData, [idKey]: idData}
    }
    return updatedData;
  }
}
