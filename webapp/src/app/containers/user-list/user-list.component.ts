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
      this.popForm('newUser', 'close');
      this.userForm.reset();
    } else {
      // Mark all form fields as touched to trigger validation messages
      this.userForm.markAllAsTouched();
    }
  }
  onCancel() {
    this.userForm.reset();
    this.popForm('newUser', 'close');
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

  // Delete user
  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
