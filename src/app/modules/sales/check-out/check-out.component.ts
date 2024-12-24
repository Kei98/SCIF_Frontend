import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
    @Input() message: string = '';
    @Input() isVisible: boolean = false;
    @Output() close = new EventEmitter<void>()

  constructor(private cartService:CartService) {
  }

  closeModal() {
    this.close.emit();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
