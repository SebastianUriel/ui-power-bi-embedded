import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { PowerBIService } from 'src/app/services/service/powerbi.service';
import * as powerbiClient from 'powerbi-client';
import * as models from 'powerbi-models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  public reportId?: string | undefined;
  public datasetId?: string | undefined;
  public hasError: boolean = false;

  constructor(private authService: MsalService,
    private powerbiService: PowerBIService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.reportId = params['reportId'];
      this.datasetId = params['datasetId'];
    });
  }

  ngOnInit() {
    if (this.reportId && this.datasetId) {
      this.hasError = false;
      this.powerbiService.getEmbeddedToken(this.reportId, this.datasetId).subscribe(
        data => {
          this.showReport(this.reportId, "https://app.powerbi.com/reportEmbed?reportId=" + this?.reportId, data?.token);
        },
        error => {
          this.hasError = true;
        }
      );
    }
  }

  async showReport(reportId?: string, embedUrl?: string, accessToken?: string) {
    let loadedResolve: any, reportLoaded = new Promise((res) => { loadedResolve = res; });
    let renderedResolve: any, reportRendered = new Promise((res) => { renderedResolve = res; });
    const powerbi: powerbiClient.service.Service = window["powerbi"];

    let config: models.IReportEmbedConfiguration = {
      type: 'report',
      id: reportId,
      embedUrl: embedUrl,
      accessToken: accessToken,
      tokenType: models.TokenType.Embed,
      permissions: models.Permissions.All,
      settings: {
        panes: {
          filters: {
            visible: false
          },
          pageNavigation: {
            visible: false
          }
        }
      }
    };

    const reportContainer = <HTMLElement>document.getElementById('powerbi-report');
    let report = powerbi.embed(reportContainer, config) as powerbiClient.Report;
    
    report.off("loaded");

    report.on("loaded", function () {
      loadedResolve();
      report.off("loaded");
    });

    report.off("error");

    report.on("error", function (event: powerbiClient.service.ICustomEvent<any>) {
      console.log(event.detail);
    });

    report.off("rendered");

    report.on("rendered", function () {
      renderedResolve();
      report.off("rendered");
    });
  }

  logout(status: boolean) {
    if (status) {
      localStorage.removeItem('token');
      this.authService.logout();
    }
  }

}
