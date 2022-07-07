import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortListedComponent } from './short-listed.component';

describe('ShortListedComponent', () => {
  let component: ShortListedComponent;
  let fixture: ComponentFixture<ShortListedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortListedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
