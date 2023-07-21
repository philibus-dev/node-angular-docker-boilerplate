import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import {UserListRoutes} from "./user-list.routes";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [UserListRoutes],
  bootstrap: [UserListComponent],
})
export class UserListModule { }
