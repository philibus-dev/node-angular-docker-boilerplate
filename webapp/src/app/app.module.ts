import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './components/app-header/app-header.module';

// Import the Auth0 module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppHeaderModule,
    /*
    AuthModule.forRoot({
      domain: 'dev-7rkghlo8iznv4sgu.us.auth0.com',
      clientId: '64xH2OlGPcRp23ot9NXcXfCVERDsAbtH',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    */
    AuthModule.forRoot({
      domain: 'dev-qkgdrbdgyyde0h6e.us.auth0.com',
      clientId: 'T8tBEz4DHjMsIXbzpJHlvPz9ciBgNVnL',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
