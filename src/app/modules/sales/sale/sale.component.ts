import { Component } from '@angular/core';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent {
  sales: any[] = [];
  selectedSaleId: number | null = null;
  salesDetails: any[] = [];
  showModal = false;
  message = '';
  // datePipe = new DatePipe();

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe((data) => {
      this.sales = data;
    });
  }

  selectSale(saleId: number): void {
    this.selectedSaleId = saleId;
    this.salesService.getSalesDetails(saleId).subscribe((data) => {
      this.salesDetails = data;
    });
  }

  deleteSale(saleId: number): void {
    if (confirm('Are you sure you want to cancel this sale?')) {
      this.salesService.deleteSale(saleId).subscribe({
        next: (res) => {
          if (res.status === 202) {
            this.loadSales();
            this.selectedSaleId = null;
            this.salesDetails = [];
            this.openModal('Sale cancelled successfully!');
          } else {
            this.openModal('Could not cancel sale. Please try again later. If error persists, contact support.');
          }
        }, error: (err) => {
          this.openModal(err);
        }
        });
    }
  }

  updateDetail(detail: any): void {
    this.salesService.updateSalesDetail(detail.ID, detail).subscribe(() => {
      this.openModal('Sales detail updated successfully!');
    });
  }

  openModal(message:any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }
}
