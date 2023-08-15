import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, map, of} from "rxjs";
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";

@Injectable({providedIn: 'root'})
export class AccessAuthOnly {

  constructor(
    private userService: UsersService,
    private router: Router) {}

  canActivate() {

    return this.userService.getCurrUser().pipe(
      map((user) => {

        if (!user) {
          window.location.replace('/');
          return false;
        }

        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );

  }

}
