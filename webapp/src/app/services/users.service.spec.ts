import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService,
    httpControler: HttpTestingController;

  const mockUsers: User[] = [
    {
      userId: 'abc123'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
