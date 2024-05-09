import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  // [componentFolder]="main_url"
  // [height]="550"
  // [report]="report"
  // [customizeCell]="customizeCellFunction"
  // [shareReportConnection]="{url: 'http://localhost:4200/reports/report'}"
  // (beforetoolbarcreated)="customizeToolbar($event)"

  public report: Object = {
    "dataSource": {
      "type": "json",
      "filename": "http://127.0.0.1:8000/inventoryreport"
  },
  "slice": {
    "reportFilters": [
        {
            "uniqueName": "Fecha.Month"
        },
        {
            "uniqueName": "Fecha.Day"
        },
        {
            "uniqueName": "Fecha.Year"
        }
    ],
    "rows": [
        {
            "uniqueName": "Producto"
        }
    ],
    "columns": [
        {
            "uniqueName": "[Measures]"
        }
    ],
    "measures": [
        {
            "uniqueName": "Cantidad",
            "aggregation": "sum"
        }
    ]
},
  }
}
