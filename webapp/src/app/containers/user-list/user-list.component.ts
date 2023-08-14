import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UsersService } from "../../services/users.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(500)])
    ])
  ]
})
export class UserListComponent implements OnInit {
  newUserFormOpen = false;
  users: User[] = [];
  selEditUser: User | undefined;

  constructor(
    private usersService: UsersService,
    public auth: AuthService) {}

  ngOnInit(): void {

    this.auth.isAuthenticated$.subscribe((isAuth) => {
      console.log('change');
      console.log(isAuth);
      console.log('---------');
    });

    this.auth.error$.subscribe((error) => {
      console.log('error');
      console.error(error);
      console.log('---------');
    });

    this.auth.appState$.subscribe((appState) => {
      console.log('appState');
      console.log(appState);
      console.log('----------');
    });

    this.auth.idTokenClaims$.subscribe((idTokenClaims) => {
      console.log('idTokenClaims');
      console.log(idTokenClaims);
      console.log('-----------');
    });

    this.getAllUsers();
  }

  onFormSubmitted(data: User) {

    if (!data.id) {
      this.usersService.postNewUser(data).subscribe({
        next: (users: User[]) => {
          this.users = users;
          this.newUserFormOpen = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.usersService.putUpdatedUser(data).subscribe({
        next: (users: User[]) => {
          this.users = users;
          this.selEditUser = undefined;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }


  formCancel(type: string) {

    switch(type) {
      case 'new' :
        this.newUserFormOpen = false;
        break;
      case 'edit' :
        this.selEditUser = undefined;
        break;
    }

  }

  // Get all users
  getAllUsers(): void {

    this.auth.isAuthenticated$.subscribe((isAuth: boolean) => {

      if (isAuth) {
        this.usersService.getAllUsers().subscribe({
          next: (users: User[]) => {
            this.users = users;
          },
          error: (err) => {
            console.error(err);
          }
        });
      }

    });

  }

  // Delete user
  deleteUser(id: string): void {

    this.usersService.deleteUser(id).subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}
