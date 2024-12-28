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
  showModal = false;
  message = '';


  protected inputsDataNull: any = {
    Active: 'true',
    ID_Card: null,
    Name: null,
    ID: null,
    Comment: null
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
    this.closeModal();
    this.supplierService.sharedData$.subscribe((data) => {
      this.receivedData = data;
      this.fillInputsData(this.receivedData);
    });
    (document.getElementById('Active') as HTMLInputElement).checked = true;
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
      ID: document.getElementById('ID'),
      ID_Card: document.getElementById('ID_Card'),
      Name: document.getElementById('Name'),
      Active: document.getElementById('Active'),
      Comment: document.getElementById('Comment')
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
    let active = document.getElementById('Active');
    for (let key in HTMLElemets) {
      if (HTMLElemets.hasOwnProperty(key)) {
        // this.inputsData[key] = HTMLElemets[key];
        (HTMLElemets[key] as HTMLInputElement).value = this.inputsData[key];
      }
    }
    if (
      this.inputsData['Active'] != null &&
      this.inputsData['Active'].toString().toLowerCase() !=
        this.checkActive(active).toString()
    ) {
      this.toggleActive(active);
    }
    this.id = this.inputsData['ID'];
    console.log(HTMLElemets);
    console.log('inputsData');
    console.log(this.inputsData);
    this.cdr.detectChanges();
  }

  clearInputsData() {
    this.fillInputsData(this.inputsDataNull);
  }

  addSupplier() {
    let HTMLElemets = this.getInputs();
    console.log(HTMLElemets);
    if((HTMLElemets['ID_Card'] as HTMLInputElement).value.trim() != '' && (HTMLElemets['Name'] as HTMLInputElement).value.trim() != '') {
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
          if(key != 'ID') {
            HTMLElemets[key] = HTMLElemets[key].value;
          }
        }
      }
      let preparedObj = this.toActualNames(HTMLElemets);
      console.log(HTMLElemets);
      this.supplierService.addSupplier(preparedObj).subscribe({
        next: (res) => {
          if (res.status === 201) {
            this.openModal('Supplier added successfully');
            HTMLElemets['ID'].value = res.body['supplier_id'];
            this.supplierNotification.notifySuccess();
          }
        },
        error: (err) => {
          this.openModal('Error ' + err.error);
        },
      });
    }
    else {
      this.openModal('Id Card and Name are required');
    }
 }

  toActualNames(object: any) {
    const {
      ID: supplier_id,
      ID_Card: supplier_id_card,
      Name: supplier_name,
      Active: supplier_active,
      Comment: supplier_comment
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
    if((HTMLElemets['ID_Card'] as HTMLInputElement).value.trim() != '' && (HTMLElemets['Name'] as HTMLInputElement).value.trim() != '') {
      let active = HTMLElemets['Active'];
      (active as HTMLInputElement).value = active.checked;
      for (const key in HTMLElemets) {
        if (HTMLElemets.hasOwnProperty(key)) {
            HTMLElemets[key] = HTMLElemets[key].value;
        }
      }
      let preparedObj = this.toActualNames(HTMLElemets);
      this.supplierService.editSupplier(this.id, preparedObj).subscribe({
        next: (res) => {
          if (res.status === 202) {
            this.openModal('Supplier edited successfully');
            this.supplierNotification.notifySuccess();
          }
        },
        error: (err) => {
          this.openModal('Error ' + err.error);
        },
      });
    }
    else {
      this.openModal('Id Card and Name are required');
    }
 }

  deleteSupplier() {
    if (this.id > 0) {
      this.supplierService.deleteSupplier(this.id).subscribe({
        next: (res) => {
          if (res.status === 202) {
            this.openModal('Supplier deleted successfully');
            this.supplierNotification.notifySuccess();
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

  openModal(message:any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }
}
