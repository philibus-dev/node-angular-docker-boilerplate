import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(500)])
    ])
  ]
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  // Convenience getter for easy access to form controls in the HTML template
  get formControls() {
    return this.userForm.controls;
  }

  @Input() user!: User;
  @Output() formSubmitted: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UsersService, private fb: FormBuilder) {}

  ngOnInit() {

    if (!this.user) {
      this.user = {
        name: '',
        email: ''
      }
    }

    this.setupForm();
  }

  setupForm() {
    this.userForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      const formDataValue = this.userForm.getRawValue();
      this.formSubmitted.emit(formDataValue);
    }
  }

  onFormCancel() {
    this.onCancel.emit();
  }

}
