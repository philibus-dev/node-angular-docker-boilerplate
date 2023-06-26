import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log('users are', this.users);
    });
  }
}
