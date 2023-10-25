import {Injectable} from "@angular/core";
import {catchError, map, of} from "rxjs";
import {UsersService} from "../services/users.service";

@Injectable({providedIn: 'root'})
export class AccessAuthOnly {

  constructor(private userService: UsersService) {}

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
