import { TestBed } from '@angular/core/testing';

import { PromocodeService } from './promocode.service';

describe('PromocodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromocodeService = TestBed.get(PromocodeService);
    expect(service).toBeTruthy();
  });
});
