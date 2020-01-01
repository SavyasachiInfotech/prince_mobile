import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecificationComponent } from './manage-specification.component';

describe('ManageSpecificationComponent', () => {
  let component: ManageSpecificationComponent;
  let fixture: ComponentFixture<ManageSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
