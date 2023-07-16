import { Component, OnInit, VERSION } from '@angular/core';

import { User } from './models/user';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  angularVersion = VERSION.full;

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
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
