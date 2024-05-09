import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {

  constructor(private cartService:CartService) {

  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
