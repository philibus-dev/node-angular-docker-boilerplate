import { Component, OnInit, VERSION } from '@angular/core';

import { User } from './models/user';
import { UsersService } from './services/users.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '100%',
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
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

  openNewUserForm() {
    this.newUserFormOpen = true;
    console.log(`Next ID is ${this.getNextId()}`);
  }
  getNextId() {
    // Never do this in production ;)
    return this.users.length + 1;
  }
  closeNewUserForm() {
    this.newUserFormOpen = false;
  }

  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log('getAllUsers():', this.users);
    });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
