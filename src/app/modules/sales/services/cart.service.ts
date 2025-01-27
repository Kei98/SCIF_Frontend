import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private localStorageKey = 'cart_products';
  private cartStructure = {
    items: []
  };

  constructor() {
    // Create local storage key only if it does not exist already
    const notExists = localStorage.getItem(this.localStorageKey) === null;
    if (notExists) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartStructure));
    }
  }
  addToCart(product:any) {
    const currentState = this.getCurrentState();

    const productExists = currentState.items.find((item:any) => {
      return item.ID === product.ID;
    });

    if (productExists) {
      productExists.QuantityP += parseInt(product.QuantityP);
    } else {
      currentState.items.push(product);
    }

    this.saveLocalStorage(currentState);
  }

  getItems() {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '{}').items;
  }

  getSubtotal() {
    const currentState = this.getCurrentState();
    const subtotal = currentState.items.reduce((total:any, item:any) => total + item.Price*item.QuantityP, 0);
    return Number(subtotal.toFixed(2));
  }

  getTotalPrice() {
    const currentState = this.getCurrentState();
    const totalPrice = currentState.items.reduce((total:any, item:any) => total + item.Price*item.QuantityP, 0) + this.getTaxes();
    return Number(totalPrice.toFixed(2));
  }

  getTaxes() {
    const currentState = this.getCurrentState();
    const taxes = currentState.items.reduce((total:any, item:any) => total + item.Price*item.QuantityP*0.13, 0);
    return Number(taxes.toFixed(2));
  }

  removeFromCart(productId: number) {
    const currentState = this.getCurrentState()
    console.log(currentState.items);
    const newItems = currentState.items.filter((item:any) => item.ID !== productId);
    currentState.items = newItems;
    this.saveLocalStorage(currentState);
    return currentState.items;
  }

  clearCart() {
    const currentState = this.getCurrentState();
    currentState.items = [];
    this.saveLocalStorage(currentState);
    return currentState.items;
  }

  getCurrentState() {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
  }

  saveLocalStorage(currentState:string) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentState));
  }
}
