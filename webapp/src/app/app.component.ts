import { Component, OnInit, VERSION } from '@angular/core';

import { User } from './models/user';
import { UsersService } from './services/users.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  updateUserFormOpen = false;
  users: User[] = [];
  userForm!: FormGroup;
  updateForm!: FormGroup;

  constructor(private usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllUsers();

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

  // Convenience getter for easy access to form controls in the HTML template
  get formControls() {
    return this.userForm.controls;
  }

  onSubmitNewUser() {
    if (this.userForm.valid) {
      // Submit the form data here (e.g., send it to the server)
      const { name, email } = this.userForm.value;
      const newUser = { id: this.getNextId(), name, email };
      this.usersService.postNewUser(newUser).subscribe((users: User[]) => {
        this.users = users;
      });
      this.popForm('newUser', 'close');
      this.userForm.reset();
    } else {
      // Mark all form fields as touched to trigger validation messages
      this.userForm.markAllAsTouched();
    }
  }
  onSubmitUpdateUser() {
    if (this.updateForm.valid) {
      console.log('this.updateForm.value is ', this.updateForm.value);
      // Submit the form data here (e.g., send it to the server)
      const { id, name, email } = this.updateForm.value;
      const updatedUser = { id, name, email };
      this.usersService.putUpdatedUser(updatedUser).subscribe((users: User[]) => {
        this.users = users;
      });
      this.popForm('updatedUser', 'close');
      this.updateForm.reset();
    } else {
      // Mark all form fields as touched to trigger validation messages
      this.updateForm.markAllAsTouched();
    }
  }
  onCancelNewUser() {
    this.userForm.reset();
    this.popForm('newUser', 'close');
  }
  onCancelUpdateUser() {
    this.userForm.reset();
    this.popForm('updateUser', 'close');
  }

  // Open/Close forms
  popForm(form: string, state: string) {
    if (form === 'newUser') {
      this.newUserFormOpen = state === 'open' ? true : false;
    } else if (form === 'updateUser') {
      this.updateUserFormOpen = state === 'open' ? true : false;
    } else {
      console.error(`No such form - ${form}.`);
    }
  }

  // New user methods
  getNextId() {
    return this.users.length + 1;  // Never do this in production ;)
  }

  // Get all users
  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log('getAllUsers():', this.users);
    });
  }

  // Update user
  updateUser(user: User): void {
    // this.usersService.
  }

  // Delete user
  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
