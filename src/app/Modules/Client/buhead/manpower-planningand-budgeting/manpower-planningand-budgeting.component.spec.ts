import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerPlanningandBudgetingComponent } from './manpower-planningand-budgeting.component';

describe('ManpowerPlanningandBudgetingComponent', () => {
  let component: ManpowerPlanningandBudgetingComponent;
  let fixture: ComponentFixture<ManpowerPlanningandBudgetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManpowerPlanningandBudgetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerPlanningandBudgetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
