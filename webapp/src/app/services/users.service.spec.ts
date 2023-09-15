import {fakeAsync, TestBed} from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../models/user";

describe('UsersService', () => {
  let service: UsersService,
    httpControler: HttpTestingController;

  const mockUsers: User[] = [
    {
      id: '123-321',
      name: 'John Tester',
      email: 'jTester@email.com'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UsersService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users when getAllUsers is called', fakeAsync(() => {

    service.getAllUsers().subscribe((res) => {
      expect(res).toEqual(mockUsers);
    });

    const req = httpControler.expectOne({
      method: 'GET',
      url: '/api/users'
    });

    req.flush(mockUsers);

  }));
});
