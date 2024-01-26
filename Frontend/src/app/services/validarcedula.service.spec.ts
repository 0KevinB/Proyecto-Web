import { TestBed } from '@angular/core/testing';

import { ValidarcedulaService } from './validarcedula.service';

describe('ValidarcedulaService', () => {
  let service: ValidarcedulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarcedulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
