import { TestBed } from '@angular/core/testing';

import { SchooldetailsService } from './schooldetails.service';

describe('SchooldetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchooldetailsService = TestBed.get(SchooldetailsService);
    expect(service).toBeTruthy();
  });
});
