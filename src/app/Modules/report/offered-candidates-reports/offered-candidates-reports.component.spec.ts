import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedCandidatesReportsComponent } from './offered-candidates-reports.component';

describe('OfferedCandidatesReportsComponent', () => {
  let component: OfferedCandidatesReportsComponent;
  let fixture: ComponentFixture<OfferedCandidatesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferedCandidatesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedCandidatesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
