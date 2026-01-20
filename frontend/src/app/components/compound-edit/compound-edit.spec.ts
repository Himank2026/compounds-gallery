import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundEdit } from './compound-edit';

describe('CompoundEdit', () => {
  let component: CompoundEdit;
  let fixture: ComponentFixture<CompoundEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
