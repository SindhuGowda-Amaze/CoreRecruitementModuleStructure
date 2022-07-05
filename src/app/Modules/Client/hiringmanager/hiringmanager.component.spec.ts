import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringmanagerComponent } from './hiringmanager.component';

describe('HiringmanagerComponent', () => {
  let component: HiringmanagerComponent;
  let fixture: ComponentFixture<HiringmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
