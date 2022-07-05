import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStaffFormComponent } from './client-staff-form.component';

describe('ClientStaffFormComponent', () => {
  let component: ClientStaffFormComponent;
  let fixture: ComponentFixture<ClientStaffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientStaffFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
