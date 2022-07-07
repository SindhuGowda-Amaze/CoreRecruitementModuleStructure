import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppedCandiadtesReportsComponent } from './dropped-candiadtes-reports.component';

describe('DroppedCandiadtesReportsComponent', () => {
  let component: DroppedCandiadtesReportsComponent;
  let fixture: ComponentFixture<DroppedCandiadtesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroppedCandiadtesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppedCandiadtesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
