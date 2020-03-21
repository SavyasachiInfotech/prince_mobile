import { TestBed } from '@angular/core/testing';

import { CodService } from './cod.service';

describe('CodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodService = TestBed.get(CodService);
    expect(service).toBeTruthy();
  });
});
