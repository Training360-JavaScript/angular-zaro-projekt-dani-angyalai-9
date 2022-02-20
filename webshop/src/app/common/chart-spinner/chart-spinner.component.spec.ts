import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSpinnerComponent } from './chart-spinner.component';

describe('ChartSpinnerComponent', () => {
  let component: ChartSpinnerComponent;
  let fixture: ComponentFixture<ChartSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
