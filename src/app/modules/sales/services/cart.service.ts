import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  constructor() { }

  addToCart(product:any) {
    // this.items.push(product);
    // console.log('this.items Service');
    // console.log(this.items);
    const existingProduct = this.items.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  getItems() {
    console.log('this.items Service');
    console.log(this.items);
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.Price, 0);
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
