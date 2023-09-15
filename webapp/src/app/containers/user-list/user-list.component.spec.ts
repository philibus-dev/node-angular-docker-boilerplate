import { TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';

let getAllUsersSpy: Spy;

describe('UserListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    getAllUsersSpy = spyOn(component, 'getAllUsers').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call all users on load', () => {
    expect(getAllUsersSpy).toHaveBeenCalled();
  });

});
