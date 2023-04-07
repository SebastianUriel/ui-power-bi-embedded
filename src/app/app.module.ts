import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { PagesModule } from './pages/pages.module';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { SharedModule } from './shared/shared.module';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '1fe647c9-5bea-41fb-9160-67d272cb72c1',
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: "http://localhost:4200/"
    }
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsalModule,
    PagesModule,
    RoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
