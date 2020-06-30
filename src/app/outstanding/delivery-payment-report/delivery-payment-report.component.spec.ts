import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPaymentReportComponent } from './delivery-payment-report.component';

describe('DeliveryPaymentReportComponent', () => {
  let component: DeliveryPaymentReportComponent;
  let fixture: ComponentFixture<DeliveryPaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
