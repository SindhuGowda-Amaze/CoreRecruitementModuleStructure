import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedPositionComponent } from './closed-position.component';

describe('ClosedPositionComponent', () => {
  let component: ClosedPositionComponent;
  let fixture: ComponentFixture<ClosedPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
