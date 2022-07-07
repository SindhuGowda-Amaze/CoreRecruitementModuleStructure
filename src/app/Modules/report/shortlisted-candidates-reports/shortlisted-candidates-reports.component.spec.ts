import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistedCandidatesReportsComponent } from './shortlisted-candidates-reports.component';

describe('ShortlistedCandidatesReportsComponent', () => {
  let component: ShortlistedCandidatesReportsComponent;
  let fixture: ComponentFixture<ShortlistedCandidatesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlistedCandidatesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedCandidatesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
