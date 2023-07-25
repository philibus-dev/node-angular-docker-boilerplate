import { TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
