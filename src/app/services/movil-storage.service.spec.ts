import { TestBed } from '@angular/core/testing';

import { MovilStorageService } from './movil-storage.service';

describe('MovilStorageService', () => {
  let service: MovilStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovilStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
