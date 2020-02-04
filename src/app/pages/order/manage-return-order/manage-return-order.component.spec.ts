import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReturnOrderComponent } from './manage-return-order.component';

describe('ManageReturnOrderComponent', () => {
  let component: ManageReturnOrderComponent;
  let fixture: ComponentFixture<ManageReturnOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReturnOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReturnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
