import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from '../pages/pages.module';
import { LoginComponent } from '../pages/login/login.component';
import { ReportComponent } from '../pages/report/report.component';
import { ReportsComponent } from '../pages/reports/reports.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'report/:reportId',
    component: ReportComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesModule,
    SharedModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
