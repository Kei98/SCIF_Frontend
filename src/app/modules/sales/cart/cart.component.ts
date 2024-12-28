import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CheckOutComponent } from '../check-out/check-out.component';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: any[];
  quantities: { [key: number]: number } = {};
  showModal = false;
  paymentMethods: any[] = [];

  constructor(private cartService:CartService, private salesService: SalesService) {
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

  getSubtotal() {
    return this.cartService.getSubtotal();
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