import { Component, ChangeDetectorRef } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { PowerBIService } from 'src/app/services/service/powerbi.service';
import { EventHandler } from 'powerbi-client-angular/components/powerbi-embed/powerbi-embed.component';
import * as models from 'powerbi-models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  public embedConfig?: any;
  public phasedEmbedding: boolean = false;
  public cssClassName: string = "reportClass";
  public eventHandlers: Map<string, EventHandler | null> = new Map([
    ['loaded', () => console.log('Report loaded')],
    ['rendered', () => console.log('Report rendered')],
    ['error', (event: any) => console.log(event.detail)]
  ]);;

  public reportId?: string | undefined;
  public datasetId?: string | undefined;

  constructor(private authService: MsalService,
    private powerbiService: PowerBIService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.reportId = params['reportId'];
      this.datasetId = params['datasetId'];
    });
  }

  ngOnInit() {
    if (this.authService.instance.getActiveAccount() == null) {
      this.router.navigate(['/login']);
    } else {
      if (this.reportId && this.datasetId) {
        this.powerbiService.getEmbeddedToken(this.reportId, this.datasetId).subscribe(
          data => {
            this.showReport(this.reportId, "https://app.powerbi.com/reportEmbed?reportId=" + this?.reportId, data?.token);
          }
        );
      }
    }
  }

  showReport(reportId?: string, embedUrl?: string, accessToken?: string) {
    this.embedConfig = {
      type: 'report',
      id: reportId,
      embedUrl: embedUrl,
      accessToken: accessToken,
      tokenType: models.TokenType.Embed,
      Permissions: models.Permissions.All,
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
  }

  logout(status: boolean) {
    if (status) {
      this.authService.logout();
    }
  }

}
