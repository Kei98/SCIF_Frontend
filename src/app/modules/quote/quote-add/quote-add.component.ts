import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.scss']
})
export class QuoteAddComponent {
  isModalOpen = true;
  currentQuestion = 1;
  quoteRequest: string = '';
  selectedCustomer: string | null = null;
  customers: any[] = [];
  quote: any = {};

  constructor(private authService: AuthService) {}

  openModal() {
    this.isModalOpen = true;
    this.loadCustomers();
  }

  loadCustomers() {
    this.customers = [ {user_id: 1, user_name:'Customer 1'}, {user_id: 2, user_name:'Customer 2'}];
  }

  handleAnswer(answer: string) {
    if (this.currentQuestion === 1) {
      this.quote.quote_on_behalf_of = answer === 'yes' ? '' : null;
      this.currentQuestion = answer === 'no' ? 1.1 : 2;
    }
  }

  nextQuestion() {
    if (this.currentQuestion === 1.1) {
      this.quote.quote_on_behalf_of = this.selectedCustomer;
      this.currentQuestion = 2;
    }
  }

  submitQuote() {
    this.quote.quote_request = this.quoteRequest;
    this.quote.quote_date = new Date();
    this.quote.quote_active = true;
    this.quote.quote_assigned_user_id = null;
    this.quote.user = this.authService.getUserId();

    this.isModalOpen = false;
      this.reset();
  }

  cancel() {
    this.isModalOpen = false;
    this.reset();
  }

  reset() {
    this.currentQuestion = 1;
    this.quoteRequest = '';
    this.selectedCustomer = null;
    this.quote = {};
  }
}
