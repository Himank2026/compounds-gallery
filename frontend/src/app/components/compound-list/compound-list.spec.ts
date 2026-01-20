import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundList } from './compound-list';

describe('CompoundList', () => {
  let component: CompoundList;
  let fixture: ComponentFixture<CompoundList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
