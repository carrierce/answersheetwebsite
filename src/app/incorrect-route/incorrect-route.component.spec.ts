import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectRouteComponent } from './incorrect-route.component';

describe('IncorrectRouteComponent', () => {
  let component: IncorrectRouteComponent;
  let fixture: ComponentFixture<IncorrectRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
