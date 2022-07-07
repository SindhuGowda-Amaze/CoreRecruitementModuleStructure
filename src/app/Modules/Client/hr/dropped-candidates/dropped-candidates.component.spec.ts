import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppedCandidatesComponent } from './dropped-candidates.component';

describe('DroppedCandidatesComponent', () => {
  let component: DroppedCandidatesComponent;
  let fixture: ComponentFixture<DroppedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroppedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
