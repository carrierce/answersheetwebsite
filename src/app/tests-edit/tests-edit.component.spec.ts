import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsEditComponent } from './tests-edit.component';

describe('TestsEditComponent', () => {
  let component: TestsEditComponent;
  let fixture: ComponentFixture<TestsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
