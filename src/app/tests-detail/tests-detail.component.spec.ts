import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsDetailComponent } from './tests-detail.component';

describe('TestsDetailComponent', () => {
  let component: TestsDetailComponent;
  let fixture: ComponentFixture<TestsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
