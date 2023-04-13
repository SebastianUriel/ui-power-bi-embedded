import { Component } from '@angular/core';
import { PowerBIService } from 'src/app/services/service/powerbi.service';
import * as models from 'powerbi-models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/service/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  public reportId?: string;
  public reportData?: any;
  public embededToken?: any;
  public hasError: boolean = false;
  public inProgress: boolean = true;

  public powerbiReport: any = {
    embedConfig: null,
    cssClassName: "reportClass",
    phasedEmbedding: false,
    eventHandlers: new Map([
      ['loaded', () => console.log('Report loaded')],
      ['rendered', () => console.log('Report rendered')],
      ['error', (event: any) => console.log(event.detail)]
    ])
  }

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.reportId = params['reportId']);
  }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    if (this.reportId) {
      try {
        this.powerbiReport.embedConfig = null;
        this.hasError = false;
        this.reportData = await this.powerbiService.getReport(this.reportId).toPromise();
        this.embededToken = await this.powerbiService.getEmbeddedToken(this.reportData?.id, this.reportData?.datasetId).toPromise();
        this.showReport(this.reportData?.id, this.embededToken?.token);
      } catch (error) {
        this.inProgress = false;
      }
    }
  }

  async showReport(reportId?: string, accessToken?: string) {
    this.powerbiReport.embedConfig = {
      type: 'report',
      id: reportId,
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=" + reportId,
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
    this.inProgress = false;
  }

}
