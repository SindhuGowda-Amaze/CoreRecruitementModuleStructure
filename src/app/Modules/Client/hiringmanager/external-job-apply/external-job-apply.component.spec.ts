import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalJobApplyComponent } from './external-job-apply.component';

describe('ExternalJobApplyComponent', () => {
  let component: ExternalJobApplyComponent;
  let fixture: ComponentFixture<ExternalJobApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalJobApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalJobApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
