import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public reports?: any[];

  constructor(private authService: MsalService,
    private powerbiService: PowerBIService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.instance.getActiveAccount() == null) {
      this.router.navigate(['/login']);
    } else {
      if (!this.reports) {
        this.powerbiService.getReports().subscribe(
          reports => {
            this.reports = reports?.value;
          }
        );
      }
    }
  }

  verReporte(data: any) {
    this.router.navigate(['/report', data?.id, 'dataset', data?.datasetId]);
  }

  logout(status: boolean) {
    if (status) {
      this.authService.logout();
    }
  }

}
