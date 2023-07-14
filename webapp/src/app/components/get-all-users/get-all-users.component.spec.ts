import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUsersComponent } from './get-all-users.component';

describe('GetAllUsersComponent', () => {
  let component: GetAllUsersComponent;
  let fixture: ComponentFixture<GetAllUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllUsersComponent]
    });
    fixture = TestBed.createComponent(GetAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
