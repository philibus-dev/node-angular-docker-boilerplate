import {Component, VERSION} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthUser} from "../../models/authUser";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  angularVersion = VERSION.full;

  currUser: AuthUser | undefined;

  constructor(
    private authService: AuthService,
    private userService: UsersService) {

    // Add a subscribe to get curr user signal
    this.authService.$currUser.subscribe({
      next: (authUser) => {

        if (authUser && typeof authUser !== 'boolean') {
          this.currUser = authUser;
        } else {
          this.currUser = undefined;
        }

      }

    });

    if (!this.currUser) {
      this.userService.getCurrUser().subscribe();
    }

  }

  loginRedirect() {
    window.location.replace("/login");
  }

  logoutRedirect() {
    window.location.replace("/logout");
  }

}
