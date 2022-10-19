import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationRejectedCandidateComponent } from './compensation-rejected-candidate.component';

describe('CompensationRejectedCandidateComponent', () => {
  let component: CompensationRejectedCandidateComponent;
  let fixture: ComponentFixture<CompensationRejectedCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompensationRejectedCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationRejectedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
