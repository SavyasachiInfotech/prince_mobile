import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCodComponent } from './change-cod.component';

describe('ChangeCodComponent', () => {
  let component: ChangeCodComponent;
  let fixture: ComponentFixture<ChangeCodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
