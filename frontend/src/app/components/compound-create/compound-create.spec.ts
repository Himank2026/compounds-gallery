import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundCreate } from './compound-create';

describe('CompoundCreate', () => {
  let component: CompoundCreate;
  let fixture: ComponentFixture<CompoundCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
