import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundDetails } from './compound-details';

describe('CompoundDetails', () => {
  let component: CompoundDetails;
  let fixture: ComponentFixture<CompoundDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
