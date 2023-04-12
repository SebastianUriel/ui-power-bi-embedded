import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public reports?: any[];

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private router: Router) {
  }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    if (!this.reports) {
      this.powerbiService.getReports().subscribe(reports => this.reports = reports?.value);
    }
  }

  showReport(reportId: string) {
    this.router.navigate(['/app/report', reportId]);
  }

}
