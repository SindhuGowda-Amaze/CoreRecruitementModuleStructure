import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorStaffDashboardComponent } from './vendor-staff-dashboard.component';

describe('VendorStaffDashboardComponent', () => {
  let component: VendorStaffDashboardComponent;
  let fixture: ComponentFixture<VendorStaffDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorStaffDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
