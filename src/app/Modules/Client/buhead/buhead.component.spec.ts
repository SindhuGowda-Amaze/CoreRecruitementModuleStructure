import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BUHeadComponent } from './buhead.component';

describe('BUHeadComponent', () => {
  let component: BUHeadComponent;
  let fixture: ComponentFixture<BUHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BUHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BUHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
