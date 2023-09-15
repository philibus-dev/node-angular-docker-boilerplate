import {ComponentFixture, TestBed} from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import Spy = jasmine.Spy;
import {HttpClientTestingModule} from "@angular/common/http/testing";

let getAllUsersSpy: Spy,
  component: UserListComponent,
  fixture: ComponentFixture<UserListComponent>;

describe('UserListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserListComponent],
      declarations: [
        UserListComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(UserListComponent);

    getAllUsersSpy = spyOn(component, 'getAllUsers').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
