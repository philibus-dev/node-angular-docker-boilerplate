import { Injectable } from '@angular/core';
import {AuthUser} from "../models/authUser";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $currUser: Subject<AuthUser | null> = new Subject<AuthUser | null>();

  public currUser: AuthUser | null = null;

  constructor() {

    this.$currUser.subscribe((currUser: AuthUser | null) => {
      this.currUser = currUser;
    });

  }

  updateCurrUser(currUser: AuthUser | null) {
    this.$currUser.next(currUser)
  }

}
