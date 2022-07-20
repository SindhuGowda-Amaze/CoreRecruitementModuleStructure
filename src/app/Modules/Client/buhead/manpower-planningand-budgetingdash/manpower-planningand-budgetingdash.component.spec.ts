import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerPlanningandBudgetingdashComponent } from './manpower-planningand-budgetingdash.component';

describe('ManpowerPlanningandBudgetingdashComponent', () => {
  let component: ManpowerPlanningandBudgetingdashComponent;
  let fixture: ComponentFixture<ManpowerPlanningandBudgetingdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManpowerPlanningandBudgetingdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerPlanningandBudgetingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
