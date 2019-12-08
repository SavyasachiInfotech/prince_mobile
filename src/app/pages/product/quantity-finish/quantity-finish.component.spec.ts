import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityFinishComponent } from './quantity-finish.component';

describe('QuantityFinishComponent', () => {
  let component: QuantityFinishComponent;
  let fixture: ComponentFixture<QuantityFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
