import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterStaffDashboardComponent } from './recruiter-staff-dashboard.component';

describe('RecruiterStaffDashboardComponent', () => {
  let component: RecruiterStaffDashboardComponent;
  let fixture: ComponentFixture<RecruiterStaffDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterStaffDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
