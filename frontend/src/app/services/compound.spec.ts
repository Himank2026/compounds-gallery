import { TestBed } from '@angular/core/testing';

import { Compound } from './compound';

describe('Compound', () => {
  let service: Compound;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Compound);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
