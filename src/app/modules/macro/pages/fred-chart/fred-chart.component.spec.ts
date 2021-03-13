import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FredChartComponent } from './fred-chart.component';

describe('FredChartComponent', () => {
  let component: FredChartComponent;
  let fixture: ComponentFixture<FredChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FredChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FredChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
