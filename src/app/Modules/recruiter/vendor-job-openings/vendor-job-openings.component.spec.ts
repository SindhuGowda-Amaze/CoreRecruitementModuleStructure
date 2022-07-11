import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorJobOpeningsComponent } from './vendor-job-openings.component';

describe('VendorJobOpeningsComponent', () => {
  let component: VendorJobOpeningsComponent;
  let fixture: ComponentFixture<VendorJobOpeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorJobOpeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorJobOpeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
