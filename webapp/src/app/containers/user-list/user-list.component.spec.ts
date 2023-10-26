import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import Spy = jasmine.Spy;
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {UsersServiceMock} from "../../services/users.service.mock";
import {throwError} from "rxjs";

describe('UserListComponent', () => {
  let component: UserListComponent,
    fixture: ComponentFixture<UserListComponent>;

  let userService: UsersService,
    getAllUsersSpy: Spy,
    postNewUserSpy: Spy,
    putUpdatedUserSpy: Spy,
    deleteUserSpy: Spy,
    consoleErrorSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: UsersService, useClass: UsersServiceMock}
      ],
      declarations: [
        UserListComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UsersService);

    getAllUsersSpy = spyOn(userService, 'getAllUsers').and.callThrough();
    postNewUserSpy = spyOn(userService, 'postNewUser').and.callThrough();
    putUpdatedUserSpy = spyOn(userService, 'putUpdatedUser').and.callThrough();
    deleteUserSpy = spyOn(userService, 'deleteUser').and.callThrough();
    consoleErrorSpy = spyOn(console, 'error').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handles get all users correctly', () => {
    component.getAllUsers();

    userService.getAllUsers().subscribe((res) => {
      expect(res).toEqual([]);
    });
  });

  it('handles get all users errors correctly', () => {
    getAllUsersSpy.and.returnValue(throwError({message: 'testing'}));

    component.getAllUsers();

    expect(consoleErrorSpy).toHaveBeenCalledWith({message: 'testing'});
  });

  it('submits new user correctly', () => {
    const user: User = {
      name: 'jTester2',
      email: 'jTester2@testing.com'
    }

    component.onFormSubmitted(user);

    expect(postNewUserSpy).toHaveBeenCalledWith(user);
  });

  it('handles submit new user error correctly', () => {
    postNewUserSpy.and.returnValue(throwError({message: 'testing'}));

    const user: User = {
      name: 'jTester2',
      email: 'jTester2@testing.com'
    }

    component.onFormSubmitted(user);

    expect(consoleErrorSpy).toHaveBeenCalledWith({ message: 'testing' });
  });

  it('submits updated user correctly', () => {
    const user: User = {
      id: '123',
      name: 'jTester2',
      email: 'jTester2@testing.com'
    }

    component.onFormSubmitted(user);

    expect(putUpdatedUserSpy).toHaveBeenCalledWith(user);
  });

  it('handles submit updated user error correctly', () => {
    putUpdatedUserSpy.and.returnValue(throwError({message: 'testing'}));

    const user: User = {
      id: '123',
      name: 'jTester2',
      email: 'jTester2@testing.com'
    }

    component.onFormSubmitted(user);

    expect(consoleErrorSpy).toHaveBeenCalledWith({ message: 'testing' });
  });

  it('should handle cancelling form correctly', () => {
    const testUser: User = {name: 'tester', email: 'tester@testing.com'};
    component.newUserFormOpen = true;
    component.selEditUser = testUser;

    component.formCancel('new');

    expect(component.newUserFormOpen).toBeFalse();
    expect(component.selEditUser).toEqual(testUser);

    component.formCancel('edit');
    expect(component.newUserFormOpen).toBeFalse();
    expect(component.selEditUser).toBeUndefined();
  });

  it('handles deletes user correctly', () => {
    component.deleteUser('123');

    expect(deleteUserSpy).toHaveBeenCalledWith('123');
  });

  it('should handle delete user errors correctly', () => {
    deleteUserSpy.and.returnValue(throwError({message: 'testing'}));

    component.deleteUser('123');

    expect(consoleErrorSpy).toHaveBeenCalledWith({message: 'testing'});
  });

});
