import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: any[];

  constructor(private cartService:CartService) {
    this.items = this.cartService.getItems();
    console.log('this.items');
    console.log(this.items);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
