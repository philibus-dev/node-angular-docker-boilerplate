import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

// models
import { User } from '../models/user';
import {AuthUser} from "../models/authUser";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getCurrUser(): Observable<AuthUser | boolean | void> {
    return this.http.get<AuthUser>('/api/users/currUser').pipe(
      map((user: AuthUser) => {

        // Update curr user subject
        this.authService.updateCurrUser(user);

        return user;
      }),
      catchError((err) => {

        if (err.status === 401) {
          // Clear curr user subject
          this.authService.updateCurrUser(null);
        }

        return of(false);
      })
    )
  }

  postNewUser(user: User): Observable<User[]> {
    return this.http.post<{ users: User[] }>('/api/users', user).pipe(map((res) => res.users));
  }

  putUpdatedUser(updatedUser: User): Observable<User[]> {
    const userId: string = updatedUser.id!;

    delete updatedUser.id;

    return this.http.put<{ users: User[] }>(`/api/users/${userId}`, updatedUser)
      .pipe(
        map((res) => res.users)
      );
  }

  deleteUser(id: string): Observable<User[]> {
    return this.http.delete<{ users: User[] }>(`/api/users/${id}`).pipe(map((res) => res.users));
  }
}
