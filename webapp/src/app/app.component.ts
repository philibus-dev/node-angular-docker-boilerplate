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
  users: User[] = [];
  userForm!: FormGroup;

  constructor(private usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllUsers();

    // Initialize the form with the necessary fields and validators
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Convenience getter for easy access to form controls in the HTML template
  get formControls() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Submit the form data here (e.g., send it to the server)
      const { name, email } = this.userForm.value;
      const newUser = { id: this.getNextId(), name, email };
      this.usersService.postNewUser(newUser).subscribe((users: User[]) => {
        this.users = users;
      });
      this.closeNewUserForm();
      this.userForm.reset();
    } else {
      // Mark all form fields as touched to trigger validation messages
      this.userForm.markAllAsTouched();
    }
  }
  onCancel() {
    this.userForm.reset();
    this.closeNewUserForm();
  }


  // New user methods
  getNextId() {
    return this.users.length + 1;  // Never do this in production ;)
  }
  openNewUserForm() {
    this.newUserFormOpen = true;
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
