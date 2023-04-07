import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: MsalService,
    private router: Router) {
    this.authService.instance.handleRedirectPromise().then(res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account);
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.instance.getActiveAccount() != null) {
      this.router.navigate(['/reports']);
    }
  }

  login() {
    const scopes = ['https://analysis.windows.net/powerbi/api/.default'];
    this.authService.acquireTokenPopup({ scopes })
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/reports']);
      });
  }

}
