import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  quotes: any[] = [];
  selectedQuoteId: number | null = null;
  isAddQuoteOpen = false;

  constructor() {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quotes = [
      { id: 1, date: '2024-12-15', description: 'I want water pupm HOWE-14, also I would like it installed at my home', user: 'hhsd ha', on_behalf_of:'', assigned_user: 'Project Manager 1', active: false },
      { id: 2, date: '2024-12-25', description: 'I would like to know the price of water pump IKSD-73', user: 'jasi tywo', on_behalf_of:'', assigned_user: 'Project Manager 1', active: true  },
      { id: 3, date: '2025-12-05', description: 'I would like to know the price of water pump HASW-34', user: 'jowe psm', on_behalf_of:'Maria Sanchez', assigned_user: 'Project Manager 2', active: true  },
    ];
  }

  openQuote(id: number): void {
    this.selectedQuoteId = id;
  }

  closeQuote(): void {
    this.selectedQuoteId = null;
  }
  openAddQuote(): void {
    this.isAddQuoteOpen = true;
  }

  closeAddQuote(): void {
    this.isAddQuoteOpen = false;
    this.loadQuotes();
  }

  closeChat(): void {
    this.selectedQuoteId = null; // Reset to return to the quotes list
  }
}
