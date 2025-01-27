import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { SalesService } from '../services/sales.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { get } from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  items: any[];
  quantities: { [key: number]: number } = {};
  showModal = false;
  message = '';
  paymentMethods: any[] = [];
  payment_method_info_selected: any = null;
  payment_method_selected: boolean = false;

  constructor(private cartService:CartService, private salesService: SalesService, private authService: AuthService) {
    this.items = this.cartService.getItems();
  }

  ngOnInit() {
    this.salesService.getPaymentMethods().subscribe({
      next: (res) => {
        this.paymentMethods = res;
      },
      error: (err) => {
        throw err;
      },
    });
  }

  ngAfterViewInit() {
    this.disableButtons();
  }

  getSubtotal() {
    return this.cartService.getSubtotal();
  }

  getTotal() {
    return this.cartService.getTotalPrice();
  }

  getTax() {
    return this.cartService.getTaxes();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  removeFromCart(productId: number) {
    this.items = this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.payment_method_selected = false;
    this.payment_method_info_selected = null;
    this.disableButtons();
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

  getPaymentMethod() {
    let input = document.getElementById('paymentMethods');
    return input;
  }

  setPaymentMethodsVal(value: any) {
    let input = document.getElementById('paymentMethods');
    input?.setAttribute('data-key', value.payment_method_id);
    (input as HTMLInputElement).value = value.payment_method_name;

    this.payment_method_info_selected = value.payment_method_info;
    this.payment_method_selected = true;
    this.disableButtons();
  }

  getPaymentMethodSelectedId() {
    let input = document.getElementById('paymentMethods');
    return input?.getAttribute('data-key');
  }

  paymentMethodSelected(payment_method_selected: any) {
    this.setPaymentMethodsVal(payment_method_selected);
    this.showDropDown();
  }

  disableButtons() {
    let checkoutBtn = document.getElementById('checkout-btn');

    if (this.payment_method_selected) {
      (checkoutBtn as HTMLButtonElement).disabled = false;
    } else {
      (checkoutBtn as HTMLButtonElement).disabled = true;
    }
  }

  openModal(message:any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }

  addSale() {
    const salesData = {
      sales_date: new Date(),
      sales_subtotal: this.getSubtotal(),
      sales_tax: this.getTax(),
      sales_discount: 0,
      sales_amount: this.getTotal(),
      user: this.authService.getUserId(),
      payment_method: this.getPaymentMethodSelectedId(),
      sales_status: 2
    };
    const salesDetails = this.items.map((item) => ({
      sales_detail_prod_price: item.Price,
      sales_detail_tax: item.Price * item.QuantityP * 0.13,
      sales_detail_discount: 0,
      sales_detail_quantity: item.QuantityP,
      sales_detail_subtotal: item.Price * item.QuantityP,
      product_s: item.ID,
      service_detail: null,
    }));

    const body = { sales: salesData, sales_details: salesDetails };
      this.salesService.addSale(body).subscribe({
        next: (res) => {
          if (res.status === 201) {
            this.openModal('Sale created successfully');
            this.clearCart();
          }else {
            this.openModal('Sale could not be created. Contact support team');
          }
        },
        error: (err) => {
          this.openModal('Sale could not be created. Contact support team. Error: ' + err);
        },
      });
  }
}