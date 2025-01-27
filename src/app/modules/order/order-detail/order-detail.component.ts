import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  @Input() purchaseId!: Number; // Pass the purchase ID from the parent
  @Output() onSave = new EventEmitter<any>(); // Emit event when saving
  @Output() onCancel = new EventEmitter<void>(); // Emit event when canceling

  detailForm: FormGroup;
  products = [
    { value: '1', name: 'Product 1' },
    { value: '2', name: 'Product 2' },
    { value: '3', name: 'Product 3' }
  ];

  constructor(private fb: FormBuilder) {
    this.detailForm = this.fb.group({
      id: [''],
      productPrice: [''],
      tax: [''],
      discount: [''],
      quantity: [''],
      subtotal: [{ value: '', disabled: true }],
      product: ['']
    });
  }

  save() {
    const detailData = { ...this.detailForm.value, purchaseId: this.purchaseId };
    this.onSave.emit(detailData);
  }

  cancel() {
    this.onCancel.emit();
  }
}
