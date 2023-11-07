import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, of } from 'rxjs';
import { AuthUser } from '../../models/authUser';
import Spy = jasmine.Spy;
import { RouterTestingModule } from '@angular/router/testing';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let authService: AuthService;
  let usersService: UsersService;

  let locationReplaceSpy: Spy;

  const authServiceStub = {
    $currUser: new BehaviorSubject<AuthUser | boolean>(false),
  };

  const usersServiceStub = {
    getCurrUser: () => of(null), // Mock the getCurrUser method
  };

  beforeAll(() => {
    window.onbeforeunload = () => 'Keep from actually navigating away.'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: UsersService, useValue: usersServiceStub }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', redirectTo: '' },
          { path: 'logout', redirectTo: '' }
        ])
      ]
    });

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    usersService = TestBed.inject(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currUser when AuthService emits a non-boolean value', () => {
    const fakeAuthUser: AuthUser = {
      nickname: 'nickname',
      name: 'name',
      picture: 'picture_url',
      updated_at: 'updated date',
      email: 'test@example.com',
      email_verified: false
    };
    authService.$currUser.next(fakeAuthUser);

    expect(component.currUser).toEqual(fakeAuthUser);
  });

  /*
  it('should redirect when loginRedirect() is called', () => {
    const routerNavigateSpy: Spy = spyOn(component.router, 'navigate').and.stub()
    component.loginRedirect();
    // expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
    expect(locationReplaceSpy).toHaveBeenCalledWith('/login');
  });

  it('should redirect when logoutRedirect() is called', () => {
    const routerNavigateSpy: Spy = spyOn(component.router, 'navigate').and.stub()
    component.logoutRedirect();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/logout']);
  });
  */

  // it('should set currUser to undefined when AuthService emits a boolean value', () => {
  //   authService.$currUser.next(true);

  //   expect(component.currUser).toBeUndefined();
  // });

  // it('should call userService.getCurrUser if currUser is not set', () => {
  //   spyOn(usersService, 'getCurrUser').and.callThrough();

  //   expect(usersService.getCurrUser).toHaveBeenCalled();
  // });

  // it('should call window.location.replace("/login") on loginRedirect', () => {
  //   spyOn(window.location, 'replace');

  //   component.loginRedirect();

  //   expect(window.location.replace).toHaveBeenCalledWith('/login');
  // });

  // it('should call window.location.replace("/logout") on logoutRedirect', () => {
  //   spyOn(window.location, 'replace');

  //   component.logoutRedirect();

  //   expect(window.location.replace).toHaveBeenCalledWith('/logout');
  // });
});
