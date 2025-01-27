import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { flattenJson } from '../../shared/data-table/data-table.component';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../sales/services/cart.service';
// import { InputSpinner } from 'bootstrap-input-spinner/src'


@Component({
  selector: 'app-product-customer',
  templateUrl: './product-customer.component.html',
  styleUrls: ['./product-customer.component.scss'],
})
export class ProductCustomerComponent implements OnInit {
  productsArray: any[] = [];
  ogProductsArray: any[] = [];
  loggedObj: any = {};
  cart_icon = faCartPlus;
  popupHidden = true;
  id: any;
  image: any;
  name: any;
  description: any;
  qty: any;
  price:any;
  spec: any;
  purchasedQty: string;
  qtyInput: any;
  showModal = false;
  message = '';

  constructor(private prodServ: ProductService, private cartService: CartService) {
    this.purchasedQty = '1';
  }
  ngOnInit(): void {
    this.loadProducts();
    this.qtyInput = document.getElementById('qty-input');
  }
  loadProducts() {
    this.prodServ.getProductData().subscribe({
      next: (res) => {
        this.ogProductsArray = flattenJson(res);
        this.productsArray = this.ogProductsArray;
      },
      error: (err) => {
        throw err;
      },
    });
  }

  addtocart() {
    let qty = this.getInputVal();
    if (qty <= this.qty) {
      const obj = {
        ID: parseInt(this.id),
        Image: this.image,
        Name: this.name,
        Price:this.price,
        QuantityP: parseInt(this.purchasedQty)
      };
      this.cartService.addToCart(obj);
      this.openModal('product added to cart');
    }else {
      this.openModal('There are not enough units to complete this purchase');
    }
  }

  showdetails(product: any) {
    this.popupHidden = false;
    this.id = product.ID;
    this.image = product.Image;
    this.name = product.Name;
    this.description = product.Description;
    this.qty = product.Quantity;
    this.price = product.Price;
    this.spec = product.Spec;
    this.resetInputVal();
  }

  closePopup() {
    this.popupHidden = true;
    this.id = null;
    this.image = null;
    this.name = null;
    this.description = null;
    this.qty = null;
    this.price = null;
    this.spec = null;
    this.resetInputVal();
  }

  resetInputVal() {
    this.purchasedQty = '1';
    (this.qtyInput as HTMLInputElement).value = this.purchasedQty;
  }

  getInputVal() {
    return this.purchasedQty = (this.qtyInput as HTMLInputElement).value;
  }

  openModal(message:any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }

  searchFn(event: Event, keys = []) {
    let target = <HTMLInputElement>event.target;
    let newData: any = [];

    if (target.value.trim() == '') {
      this.productsArray = this.ogProductsArray;
    } else {
      this.productsArray.forEach((elem: any) => {
        let lCaseName = elem.Name.toLowerCase();
        let lCaseDesc = elem.Description.toLowerCase();
        if (
          lCaseName.indexOf(target.value.toLowerCase()) > -1 ||
          lCaseDesc.indexOf(target.value.toLowerCase()) > -1
        ) {
          newData.push(elem);
        }
      });
      this.productsArray = newData;
    }
  }
}
