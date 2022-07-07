import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedCandidatesReportComponent } from './joined-candidates-report.component';

describe('JoinedCandidatesReportComponent', () => {
  let component: JoinedCandidatesReportComponent;
  let fixture: ComponentFixture<JoinedCandidatesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedCandidatesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedCandidatesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
