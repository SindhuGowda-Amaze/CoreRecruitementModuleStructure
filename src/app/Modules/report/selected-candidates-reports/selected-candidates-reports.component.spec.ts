import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCandidatesReportsComponent } from './selected-candidates-reports.component';

describe('SelectedCandidatesReportsComponent', () => {
  let component: SelectedCandidatesReportsComponent;
  let fixture: ComponentFixture<SelectedCandidatesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCandidatesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCandidatesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
