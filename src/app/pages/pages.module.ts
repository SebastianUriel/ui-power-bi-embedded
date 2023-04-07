import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { ServicesModule } from '../services/services.module';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    LoginComponent,
    ReportComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    PowerBIEmbedModule,
    ServicesModule,
    ComponentsModule
  ],
  exports: [
    LoginComponent,
    ReportComponent,
    ReportsComponent
  ]
})
export class PagesModule { }
