import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';
import { of } from 'rxjs';
import { TaskStatus } from 'src/app/TaskStatus.enum';
import {NO_ERRORS_SCHEMA} from "@angular/core";


describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockUiService: jasmine.SpyObj<UiService>;

  beforeEach(() => {
    const taskSpy = jasmine.createSpyObj('TaskService', ['editTask', 'deleteTask']);
    taskSpy.editTask.and.returnValue(Promise.resolve(true));
    taskSpy.deleteTask.and.returnValue(Promise.resolve(true));
    const uiSpy = jasmine.createSpyObj('UiService', ['onFilterToggle', 'onEditToggle', 'toggleEditTask']);

    TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [
        { provide: TaskService, useValue: taskSpy },
        { provide: UiService, useValue: uiSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]

    });

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    mockUiService = TestBed.inject(UiService) as jasmine.SpyObj<UiService>;

    // Simulate observables for the mock services
    mockUiService.onFilterToggle.and.returnValue(of(true));
    mockUiService.onEditToggle.and.returnValue(of(true));
    component.task = {
      id: 1,
      title: 'Test Task',
      date: new Date(),
      time: '10:00',
      taskType: 'work',
      taskStatus: TaskStatus.CREATED
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('completedTask should update task status to COMPLETED', () => {
    component.completedTask();
    expect(mockTaskService.editTask).toHaveBeenCalled();
    expect(component.newTaskStatus).toEqual(TaskStatus.CREATED); // since we reset it after completion
  });

  it('toggleTask should toggle task status', () => {
    component.toggleTask();
    expect(mockTaskService.editTask).toHaveBeenCalled();
    expect(component.newTaskStatus).toEqual(TaskStatus.IN_PROGRESS); // as initial status was CREATED
  });

  it('editTask should trigger the edit task UI', () => {
    component.editTask();
    expect(mockUiService.toggleEditTask).toHaveBeenCalledWith(component.task);
  });

  it('deleteTask should delete the task', () => {
    component.deleteTask();
    // @ts-ignore
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(component.task.id);
  });

});
