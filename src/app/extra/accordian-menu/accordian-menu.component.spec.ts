import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordianMenuComponent } from './accordian-menu.component';

describe('AccordianMenuComponent', () => {
  let component: AccordianMenuComponent;
  let fixture: ComponentFixture<AccordianMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordianMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordianMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
