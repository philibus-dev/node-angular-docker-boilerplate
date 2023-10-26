import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import Spy = jasmine.Spy;

describe('UserComponent', () => {
  let component: UserComponent,
    fixture: ComponentFixture<UserComponent>;

  let setupFormSpy: Spy,
    formSubmitEmitSpy: Spy,
    formCancelEmitSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [UserComponent]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    setupFormSpy = spyOn(component, 'setupForm').and.callThrough();
    formSubmitEmitSpy = spyOn(component.formSubmitted, 'emit').and.callThrough();
    formCancelEmitSpy = spyOn(component.onCancel, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should startup correctly', () => {
    component.user = {id: '123', name: 'joe tester', email: 'jtester@testin.com'};
    component.ngOnInit();

    expect(setupFormSpy).toHaveBeenCalled();

    expect(component.userForm.getRawValue()).toEqual(component.user);
  });

  it('submits form correctly', () => {
    component.user = {id: '123', name: 'joe tester', email: 'jtester@testin.com'};

    component.ngOnInit();
    component.onFormSubmit();

    expect(formSubmitEmitSpy).toHaveBeenCalledWith(component.user);
  });

  it('cancels form correctly', () => {
    component.onFormCancel();

    expect(formCancelEmitSpy).toHaveBeenCalled();
  })
});
