import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faPenToSquare,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit{
    purchases: any[] = [];
    selectedPurchaseId: number | null = null;
    purchaseDetails: any[] = [];
    showModal = false;
    message = '';
    icon = faMagnifyingGlass;
    faPlus = faPlus;
    faTrash = faTrash;
    faPentoSquare = faPenToSquare;
    faEraser = faEraser;
    protected id = 2;
    protected prod_list: any;
    protected selectedProd: any = null;
    protected supplier_list: any;
    protected selectedSupplier: any = null;
    protected addSpecButton = true;
    protected formSpecSheet = true;

    constructor(private purchaseService: PurchaseService) {}

    ngOnInit(): void {
      this.loadPurchase();
    }

    loadPurchase(): void {
      this.purchaseService.getPurchases().subscribe((data) => {
        this.purchases = data;
      });
    }

    selectPurchase(purchaseId: number): void {
      this.selectedPurchaseId = purchaseId;
      this.purchaseService.getPurchasesDetails(purchaseId).subscribe((data) => {
        this.purchaseDetails = data;
      });
    }

    deletePurchase(purchaseId: number): void {
      if (confirm('Are you sure you want to cancel this purchase?')) {
        this.purchaseService.deletePurchase(purchaseId).subscribe({
          next: (res) => {
            if (res.status === 202) {
              this.loadPurchase();
              this.selectedPurchaseId = null;
              this.purchaseDetails = [];
              this.openModal('Purchase cancelled successfully!');
            } else {
              this.openModal('Could not cancel purchase. Please try again later. If error persists, contact support.');
            }
          }, error: (err) => {
            this.openModal(err);
          }
          });
      }
    }

    updateDetail(detail: any): void {
      this.purchaseService.updatePurchasesDetail(detail.ID, detail).subscribe(() => {
        this.openModal('Purchase detail updated successfully!');
      });
    }

    openModal(message:any) {
      this.message = message;
      this.showModal = true;
    }

    closeModal() {
      this.showModal = false;
      this.message = '';
    }


  // ngOnInit(): void {
  //   this.closeModal();
  //   this.productService.getProductSheetData().subscribe({
  //     next: (res) => {
  //       this.prod_sheet_list = res;
  //     },
  //     error: (err) => {
  //       throw err;
  //     },
  //   });

  //   this.productService.sharedData$.subscribe((data) => {
  //     this.receivedData = data;
  //     this.fillInputsData(this.receivedData);
  //   });
  //   (document.getElementById('Active') as HTMLInputElement).checked = true;
  // }
  // // ngOnChanges(changes: SimpleChanges): void {
  // //   this.fillInputs(changes);
  // // }

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
  }
  createSpecSheet() {
    let input = this.getSpecSheet();
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
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        // this.inputsData[key] = data[key];
      }
    }
    this.checkInputsData(data);
    // if (data != this.inputsDataNull && data != undefined && data != null && data != '') {
      // this.setDataKeySelected(data.Spec);
    // }
    this.fillInputs();
    // this.disableButtons();
  }

  fillInputs() {
    let HTMLElemets = this.getInputs();
    let active = document.getElementById('Active');
    for (let key in HTMLElemets) {
      if (HTMLElemets.hasOwnProperty(key)) {
        // (HTMLElemets[key] as HTMLInputElement).value = this.inputsData[key];
      }
    }

    // if (
      // this.inputsData['Active'] != null &&
      // this.inputsData['Active'].toLowerCase() !=
        // this.checkActive(active).toString()
    // ) {
      // this.toggleActive(active);
    // }
    // this.id = this.inputsData['ID'];
    let spec = document.getElementById('Spec');
    if (spec != undefined) {
      // spec.setAttribute('data-key', this.selectedSepec);
    }
    // this.cdr.detectChanges();
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
      // this.inputsData['Quantity'] = null;
      // this.inputsData['Cost'] = null;
      // this.inputsData['Price'] = null;
    }
  }

}
