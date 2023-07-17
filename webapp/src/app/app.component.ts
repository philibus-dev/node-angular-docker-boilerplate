import { Component, OnInit, VERSION } from '@angular/core';

import { User } from './models/user';
import { UsersService } from './services/users.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(500)])
    ])
  ],
})
export class AppComponent implements OnInit {
  angularVersion = VERSION.full;
  newUserFormOpen = false;
  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  // New user methods
  getNextId() {
    return this.users.length + 1;  // Never do this in production ;)
  }
  openNewUserForm() {
    this.newUserFormOpen = true;
    console.log(`Next ID is ${this.getNextId()}`);
  }
  closeNewUserForm() {
    this.newUserFormOpen = false;
  }

  // Get all users
  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log('getAllUsers():', this.users);
    });
  }

  // Delete user
  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
