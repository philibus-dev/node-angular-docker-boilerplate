import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { UserListRoutes } from "./user-list.routes";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from '../user/user.component';

@NgModule({
  declarations: [
    UserListComponent, UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [UserListRoutes],
  bootstrap: [UserListComponent],
})
export class UserListModule { }
