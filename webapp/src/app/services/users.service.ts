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
    return this.http.post<{ users: User[] }>('/api/users', user).pipe(map((res) => res.users));;
  }

  // getUser(userId: number): void {
  //   console.log(`get user ${userId}`);
  // }

  // editUser(updatedUser: User): User {
  //   return {'id': 3, name: 'Test', email: 'test@example.com'};
  // }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<{ users: User[] }>(`/api/users/${id}`).pipe(map((res) => res.users));
  }
}
