import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTaskComponent } from './report-task.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ReportTaskComponent', () => {
  let component: ReportTaskComponent;
  let fixture: ComponentFixture<ReportTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportTaskComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ReportTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
