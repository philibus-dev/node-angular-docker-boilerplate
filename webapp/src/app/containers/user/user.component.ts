import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  form: FormGroup;

  @Input() user?: User;
  @Output() formSubmitted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      formData: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      const formDataValue = this.form.get('formData')?.value;
      console.log('emitting from the child form');
      this.formSubmitted.emit(formDataValue);
    }
  }
}
