import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './user.service';



describe('UserService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
