import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteMasterComponent } from './quote-master.component';

describe('QuoteMasterComponent', () => {
  let component: QuoteMasterComponent;
  let fixture: ComponentFixture<QuoteMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
