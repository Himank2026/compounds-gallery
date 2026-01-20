import { TestBed } from '@angular/core/testing';

import { CompoundService } from './compound.service';

describe('Compound', () => {
  let service: CompoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
