import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
// models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  postNewUser(user: User): Observable<User[]> {
    return this.http.post<{ users: User[] }>('/api/users', user).pipe(map((res) => res.users));
  }

  // getUser(userId: number): void {
  //   console.log(`get user ${userId}`);
  // }

  putUpdatedUser(updatedUser: User): Observable<User[]> {
    const userId: number = updatedUser.id;
    console.log('putUpdatedUser() userId');
    return this.http.put<{ users: User[] }>(`/api/users/${userId}`, updatedUser).pipe(map((res) => res.users));
  }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<{ users: User[] }>(`/api/users/${id}`).pipe(map((res) => res.users));
  }
}
