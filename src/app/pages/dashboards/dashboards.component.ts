import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  public dashboards?: any[];

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private router: Router) { }

    async ngOnInit() {
      await this.authService.handleActiveAccount();
      if (!this.dashboards) {
        this.powerbiService.getDashboards().subscribe(dashboards => this.dashboards = dashboards?.value);
      }
    }

    showDashboard(dashboardId: string) {
      this.router.navigate(['/app/dashboard', dashboardId]);
    }

}
