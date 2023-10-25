import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

// models
import { User } from '../models/user';
import { AuthUser } from "../models/authUser";

@Injectable({
  providedIn: 'root',
})
export class UsersServiceMock {
  constructor() { }

  users: User[] = [];

  getAllUsers(): Observable<User[]> {
    return of(this.users);
  }

  getCurrUser(): Observable<AuthUser | boolean | void> {
    return of({
      nickname: 'jTester',
      name: 'Joe Tester',
      picture: 'profile.jpg',
      updated_at: '2023-10-25',
      email: 'jtester@testing.com',
      email_verified: true
    });
  }

  postNewUser(user: User): Observable<User[]> {
    return of(this.users);
  }

  putUpdatedUser(updatedUser: User): Observable<User[]> {
    return of(this.users);
  }

  deleteUser(id: string): Observable<User[]> {
    return of(this.users);
  }
}
