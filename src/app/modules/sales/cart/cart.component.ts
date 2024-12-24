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
    const quantity = this.quantities[product.id] || 1;  // Default to 1 if no quantity specified

    for (let i = 0; i < quantity; i++) {
      this.cartService.addToCart(product);
    }
    this.quantities[product.id] = 1;
  }

  removeFromCart(productId: number) {
    this.items = this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }
}
