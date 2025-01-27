import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  purchaseForm: FormGroup;
  viewdetail = false;
  services = [
    { value: '1', name: 'montero.a@montero.fam.com' },
    { value: '2', name: 'zuniga.auto@auto.com' },
    { value: '3', name: 'torres@bombas.com' }
  ];
  purchases = [ { id: 1, date: '2024-12-15', subtotal: 108, tax: 13, discount: 5, total: 108, active: false, service: 'Installation', supplier: 'montero.a@montero.fam.com', user: 'flor.u@gmail.com' },];
  showPurchaseDetail = false;
  selectedId = 1;

  constructor(private fb: FormBuilder) {
    this.purchaseForm = this.fb.group({
      id: [''],
      date: [''],
      subtotal: [''],
      tax: [''],
      discount: [''],
      total: [{ value: '', disabled: true }],
      active: [true],
      service: [''],
      userId: ['']
    });
  }
  ngOnInit(): void {
    // this.loadPurchases();
  }

  addNewService() {
    console.log('Adding new service');
  }

  togglePurchaseDetailForm() {
    this.showPurchaseDetail = !this.showPurchaseDetail;
  }

  toggleViewDetail() {
    this.viewdetail = !this.viewdetail;
  }

  add() {
    console.log('Add clicked');
  }

  edit() {
    console.log('Edit clicked');
  }

  delete() {
    console.log('Delete clicked');
  }

  clearForm() {
    this.purchaseForm.reset();
  }

  savePurchaseDetail(detail: any) {
    console.log('Purchase detail saved', detail);
  }

  viewDetails(id: number) {
    console.log('View details for', id);
  }

  deletePurchase(id: number) {
    console.log('Delete purchase', id);
  }

}
