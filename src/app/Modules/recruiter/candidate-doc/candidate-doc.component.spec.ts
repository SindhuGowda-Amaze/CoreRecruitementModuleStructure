import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDocComponent } from './candidate-doc.component';

describe('CandidateDocComponent', () => {
  let component: CandidateDocComponent;
  let fixture: ComponentFixture<CandidateDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
