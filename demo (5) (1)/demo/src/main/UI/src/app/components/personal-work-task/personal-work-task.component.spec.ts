import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalWorkTaskComponent } from './personal-work-task.component';

describe('PersonalWorkTaskComponent', () => {
  let component: PersonalWorkTaskComponent;
  let fixture: ComponentFixture<PersonalWorkTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalWorkTaskComponent]
    });
    fixture = TestBed.createComponent(PersonalWorkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
