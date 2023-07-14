import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewUserComponent } from './post-new-user.component';

describe('PostNewUserComponent', () => {
  let component: PostNewUserComponent;
  let fixture: ComponentFixture<PostNewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostNewUserComponent]
    });
    fixture = TestBed.createComponent(PostNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
