import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { GetAllUsersComponent } from './components/get-all-users/get-all-users.component';
import { GetUserComponent } from './components/get-user/get-user.component';
import { PostNewUserComponent } from './components/post-new-user/post-new-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

@NgModule({
  declarations: [AppComponent, GetAllUsersComponent, GetUserComponent, PostNewUserComponent, UpdateUserComponent, DeleteUserComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
