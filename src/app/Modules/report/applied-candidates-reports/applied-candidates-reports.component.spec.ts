import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedCandidatesReportsComponent } from './applied-candidates-reports.component';

describe('AppliedCandidatesReportsComponent', () => {
  let component: AppliedCandidatesReportsComponent;
  let fixture: ComponentFixture<AppliedCandidatesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedCandidatesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedCandidatesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
