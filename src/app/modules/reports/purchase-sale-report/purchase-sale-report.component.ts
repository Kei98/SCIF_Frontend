import { Component, Inject, AfterViewInit } from '@angular/core';
import { ReportService } from '../services/report.service';
// import { AuthService } from '../../auth/services/auth.service';
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';
import * as XLSX from 'xlsx';

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

@Component({
  selector: 'app-purchase-sale-report',
  templateUrl: './purchase-sale-report.component.html',
  styleUrls: ['./purchase-sale-report.component.scss'],
})
export class PurchaseSaleReportComponent {
  filteredRecords: any[] = [];
  allRecords: any[] = [];
  startDate: Date = new Date('2024-04-01');
  endDate: Date = new Date();
  allPurchasesSales: string[] = [];
  totalSummary: { bought: number; sold: number }  = { bought: 0, sold: 0 };
  displayedColumns: string[] = ['ID', 'Date', 'Total'];


  private chartInstance: Chart | null = null;

  constructor(private reportService: ReportService) {}

  ngAfterViewInit(): void {
    this.getReportData();
  }

  getReportData() {
    this.reportService.getPurchasesVsSalesReport().subscribe((data: any[]) => {
      this.allRecords = data;
      this.filteredRecords = this.allRecords;
      this.calculateReport();
      this.updateChart();
      this.allPurchasesSales = this.getIds();
    });
  }

  filterData() {
    this.filteredRecords = this.allRecords.filter((item) => {
      const recordDate = new Date(item.Date);
      const dateInRange =
        recordDate >= this.startDate && recordDate <= this.endDate;
      return dateInRange;
    });
    this.calculateReport();
    this.updateChart();
  }

  calculateReport() {
    this.totalSummary = { bought: 0, sold: 0 };
    this.filteredRecords.forEach((item) => {
      if (!this.totalSummary) {
        this.totalSummary = { bought: 0, sold: 0 };
      }

      if (item.Total < 0) {
        this.totalSummary.sold += Math.abs(item.Total);
      } else {
        this.totalSummary.bought += Math.abs(item.Total);
      }
    });
  }

  // Helper to get IDs
  getIds(): string[] {
    return this.filteredRecords.map((item) => item.ID);
  }

  // Update the chart with the filtered data
  updateChart() {
    // const labels = this.getIds();
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const difference = this.totalSummary.sold - this.totalSummary.bought;
    const diffColors = difference > 0 ? ['rgba(0, 123, 255, 1)','rgba(0, 123, 255, 0.5)'] : ['rgba(255, 99, 132, 1)','rgba(255, 99, 132, 0.5)'];
    if (ctx) {
      // If a chart instance exists, destroy it before creating a new one
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Create a new chart instance
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Difference (Sold - Bought)', 'Amount Bought', 'Amount Sold'],
          datasets: [
            {
              label: 'Total Amount',
              data: [Math.abs(difference), this.totalSummary.bought, this.totalSummary.sold],
              backgroundColor: [diffColors[0],'rgba(255, 99, 132, 0.5)','rgba(0, 123, 255, 0.5)'],
              borderColor: [diffColors[1],'rgba(255, 99, 132, 1)','rgba(0, 123, 255, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: 'linear',
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  // Export the filtered report to an Excel file
  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredRecords);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.xlsx';
    link.click();
  }
}
