import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {AuthUser} from "../models/authUser";
import Spy = jasmine.Spy;

describe('AuthService', () => {
  let service: AuthService;

  let currUserNextSpy: Spy;

  const testAuthUser: AuthUser = {
    nickname: 'jTester',
    name: 'John Tester',
    picture: 'profile.jpg',
    updated_at: '2023-10-22',
    email: 'jtester@test.com',
    email_verified: true
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);

    currUserNextSpy = spyOn(service.$currUser, 'next').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set currUser whenever a value is pushed', fakeAsync(() => {
    service.updateCurrUser(testAuthUser);

    expect(currUserNextSpy).toHaveBeenCalled();
    tick(2000);

    expect(service.currUser).toEqual(testAuthUser);
  }));

});
