import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

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
  updateUserFormOpen = false;
  users: User[] = [];
  userForm!: FormGroup;
  updateForm!: FormGroup;

  // Convenience getter for easy access to form controls in the HTML template
  get formControls() {
    return this.userForm.controls;
  }

  constructor(private usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.setupForm();
  }

  setupForm() {
    // Add user form
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Update user form
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitUser(type: string): boolean | void {

    let formSubmitted = undefined;

    switch(type) {
      case 'newUser' :
        formSubmitted = this.userForm;
        break;
      case 'updatedUser' :
        formSubmitted = this.updateForm;
        break;
    }

    if (!formSubmitted) {return false;}

    if (formSubmitted.valid) {
      const currUser: User = formSubmitted.value;

      if (type === 'newUser') {

        this.usersService.postNewUser(currUser).subscribe({
          next: (users: User[]) => {
            this.users = users;
          },
          error: (err) => {
            console.error(err);
          }
        });

      } else {

        this.usersService.putUpdatedUser(currUser).subscribe({
          next: (users: User[]) => {
            this.users = users;
          },
          error: (err) => {
            console.error(err);
          }
        });

      }

      this.popForm(type, 'close');

      formSubmitted.reset();


    } else {
      // Mark all form fields as touched to trigger validation messages
      formSubmitted.markAllAsTouched();
    }

  }

  onCancelEditNewUser(type: string) {
    this.userForm.reset();
    this.popForm(type, 'close');
  }

  // Open/Close forms
  popForm(form: string, state: string) {
    if (form === 'newUser') {
      this.newUserFormOpen = state === 'open';
    } else if (form === 'updateUser') {
      this.updateUserFormOpen = state === 'open';
    } else {
      console.error(`No such form - ${form}.`);
    }
  }

  // Get all users
  getAllUsers(): void {

    this.usersService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log('getAllUsers():', this.users);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  updateUser(user: User): void {
    // this.usersService.
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
