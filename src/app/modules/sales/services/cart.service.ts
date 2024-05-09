import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  constructor() { }

  addToCart(product:any) {
    this.items.push(product);
    console.log('this.items Service');
    console.log(this.items);
  }

  getItems() {
    console.log('this.items Service');
    console.log(this.items);
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.Price, 0);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
