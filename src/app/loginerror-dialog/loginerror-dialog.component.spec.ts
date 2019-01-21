import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginerrorDialogComponent } from './loginerror-dialog.component';

describe('LoginerrorDialogComponent', () => {
  let component: LoginerrorDialogComponent;
  let fixture: ComponentFixture<LoginerrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginerrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginerrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
