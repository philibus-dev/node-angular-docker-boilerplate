import {Component, Inject, VERSION} from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  angularVersion = VERSION.full;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService) {}

  loginRedirect() {
    this.auth.loginWithRedirect();
  }

  logoutRedirect() {
    this.auth.logout({
      logoutParams: {
        returnTo: document.location.origin
      }
    });
  }

}
