import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorStaffFormComponent } from './vendor-staff-form.component';

describe('VendorStaffFormComponent', () => {
  let component: VendorStaffFormComponent;
  let fixture: ComponentFixture<VendorStaffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorStaffFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
