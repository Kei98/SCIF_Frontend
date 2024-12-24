import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: any[];
  quantities: { [key: number]: number } = {};

  constructor(private cartService:CartService) {
    this.items = this.cartService.getItems();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }


  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  removeFromCart(productId: number) {
    this.items = this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }
}