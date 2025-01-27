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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  filteredRecords: any[] = [];
  allRecords: any[] = [];
  startDate: Date = new Date('2024-04-01');
  endDate: Date = new Date('2025-01-13');
  allProducts: string[] = [];
  productSummary: { [key: string]: { bought: number; sold: number } } = {};
  displayedColumns: string[] = ['Product', 'Date', 'Quantity'];
  selectedProducts: string[] = [];
  private chartInstance: Chart | null = null;

  constructor(private reportService: ReportService) {}

  ngAfterViewInit(): void {
    this.getReportData();
  }

  getReportData() {
    this.reportService.getInventoryReport().subscribe((data: any[]) => {
      this.allRecords = data;
      this.filteredRecords = this.allRecords;
      this.calculateReport();
      this.updateChart();
      this.allProducts = this.getProductNames();
    });
  }

  filterData() {
    this.filteredRecords = this.allRecords.filter((item) => {
      const recordDate = new Date(item.Date);
      console.log('this.selectedProducts');
      console.log(this.selectedProducts);
      const productMatches =
        this.selectedProducts.length === 0 ||
        this.selectedProducts.includes(item.Product);
      const dateInRange =
        recordDate >= this.startDate && recordDate <= this.endDate;
      return productMatches && dateInRange;
    });
    this.calculateReport();
    this.updateChart();
  }

  calculateReport() {
    this.productSummary = {};
    this.filteredRecords.forEach((item) => {
      const product = item.Product;
      if (!this.productSummary[product]) {
        this.productSummary[product] = { bought: 0, sold: 0 };
      }

      if (item.Quantity < 0) {
        this.productSummary[product].sold += Math.abs(item.Quantity);
      } else {
        this.productSummary[product].bought += Math.abs(item.Quantity);
      }
    });
  }

  // Helper to get product names
  getProductNames(): string[] {
    return Object.keys(this.productSummary);
  }

  // Update the chart with the filtered data
  updateChart() {
    const labels = this.getProductNames();
    const boughtData = labels.map(
      (product) => this.productSummary[product].bought
    );
    const soldData = labels.map((product) => this.productSummary[product].sold);
    let difference = labels.map((product) => this.productSummary[product].bought - this.productSummary[product].sold);
    const boughtColor = ['rgba(0, 123, 255, 1)','rgba(0, 123, 255, 0.5)'];
    const soldColor = ['rgba(255, 99, 132, 1)','rgba(255, 99, 132, 0.5)'];
    const diffColors = difference.map((diff) => diff > 0 ? boughtColor : soldColor);
    difference.forEach((diff, index) => {
      if (diff < 0) { difference[index] = Math.abs(diff); }});
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      // If a chart instance exists, destroy it before creating a new one
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Create a new chart instance
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Bought',
              data: boughtData,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Sold',
              data: soldData,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Total Units Bought - Sold',
              data: difference,
              backgroundColor: diffColors.map((color) => color[0]),
              borderColor: diffColors.map((color) => color[1]),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: 'linear', // Explicitly set the scale type
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
