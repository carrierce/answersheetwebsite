import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCreatePracticeComponent } from './tests-create-practice.component';

describe('TestsCreatePracticeComponent', () => {
  let component: TestsCreatePracticeComponent;
  let fixture: ComponentFixture<TestsCreatePracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsCreatePracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsCreatePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
