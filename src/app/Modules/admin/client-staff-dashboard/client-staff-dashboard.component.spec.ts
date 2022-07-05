import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStaffDashboardComponent } from './client-staff-dashboard.component';

describe('ClientStaffDashboardComponent', () => {
  let component: ClientStaffDashboardComponent;
  let fixture: ComponentFixture<ClientStaffDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientStaffDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
