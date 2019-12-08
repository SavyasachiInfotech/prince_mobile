import { TestBed } from '@angular/core/testing';

import { CategoryImageService } from './category-image.service';

describe('CategoryImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryImageService = TestBed.get(CategoryImageService);
    expect(service).toBeTruthy();
  });
});
