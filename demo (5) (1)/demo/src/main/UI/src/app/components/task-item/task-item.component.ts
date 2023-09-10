import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Task} from 'src/app/Task';
import {faCheck, faClockFour, faTimes, faWrench} from '@fortawesome/free-solid-svg-icons';
import {UiService} from 'src/app/services/ui.service';
import {Subscription} from 'rxjs';
import {TaskService} from 'src/app/services/task.service';
import {TaskStatus} from 'src/app/TaskStatus.enum';
import {PersonalTask} from "../../PersonalTask";
import {WorkTask} from "../../WorkTask";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit{
  @Input() task!: WorkTask | PersonalTask;
  @Input() taskType!: string;
  @Input() location?: string;
  @Input() priority?: number;

  applyGradient: boolean = false;
  applyFinish: boolean = false;

  isWorkTask?: boolean;
  isPersonalTask?: boolean;

  apiUrl: string = 'http://localhost:8080';
  id?: number;

  newTaskStatus: TaskStatus = TaskStatus.CREATED;

  faTimes = faTimes;
  faClock = faClockFour;
  faCheck = faCheck;
  faWrench = faWrench;

  showEditTask?: boolean;
  filterByType?: boolean;
  subscription?: Subscription;
  filterByTypeSubscription?: Subscription;

  constructor(private uiService:UiService, private taskService: TaskService){}

  ngOnInit(): void {
    const currentTask = this.task;
    if(currentTask && currentTask.taskStatus === TaskStatus.IN_PROGRESS){
      this.applyGradient = true;
    }
    else if (currentTask && currentTask.taskStatus === TaskStatus.COMPLETED){
      this.applyFinish = true;
    }

    console.log(this.location, this.priority);

    this.isWorkTask = (this.task as any).priority !== undefined;
    this.isPersonalTask = (this.task as any).location !== undefined;

    if('priority' in this.task){
      this.priority = this.task.priority;
    }

    if('location' in this.task){
      this.location = this.task.location;
    }

    this.filterByTypeSubscription = this.uiService
      .onFilterToggle()
      .subscribe((value) => {
        this.filterByType = value;
        console.log('filterByType value:', value);
      });

    this.subscription = this.uiService
      .onEditToggle()
      .subscribe((value) => (this.showEditTask = value));
  }

  completedTask() {
    console.log("Completed " + this.task.title + "!");

    if(this.task.taskStatus === TaskStatus.COMPLETED){
      alert('This Task has already been marked complete!');
      return;
    }

    this.newTaskStatus = TaskStatus.COMPLETED;
    const updatedTask: Task = {
      id: this.task.id,
      title: this.task.title,
      date: this.task.date,
      time: this.task.time,
      taskType: this.task.taskType,
      taskStatus: this.newTaskStatus
    };

    this.newTaskStatus = TaskStatus.CREATED;

    this.taskService.editTask(updatedTask)
      .then(() => {
        console.log('Task Update Successfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  toggleTask() {
    const currentTask = this.task;
    if (currentTask && currentTask.taskStatus === TaskStatus.COMPLETED){
      alert('This Task has already been marked complete!');
      return;
    }

    console.log("Toggling " + this.task.title);

    if(currentTask.taskStatus === TaskStatus.CREATED){
      this.newTaskStatus = TaskStatus.IN_PROGRESS;
    } else if(currentTask.taskStatus === TaskStatus.IN_PROGRESS){
      this.newTaskStatus = TaskStatus.CREATED;
    } else {
      alert('Task is already completed!');
      return;
    }

    const updatedTask: any = {
      ...this.task,
      taskStatus: this.newTaskStatus
    };

    if ('priority' in updatedTask) {
      updatedTask.priority = this.priority;
    } else if ('location' in updatedTask) {
      updatedTask.location = this.location;
    }

    this.taskService.editTask(updatedTask)
      .then(() => {
        console.log('Task Update Successfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  editTask(){

    if(this.task.taskStatus === TaskStatus.COMPLETED){
      alert('This Task has already been marked complete!');
      return;
    }

    console.log("Editing " + this.task.title);
    this.uiService.toggleEditTask(this.task);
  }

  deleteTask(){
    console.log("Deleting " + this.task.title);

    if (this.task && this.task.id !== undefined) {
      this.id = this.task.id;

      this.taskService.deleteTask(this.id)
        .then(() => {
          console.log('Task Deleted Successfully');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error("Task ID is undefined!");
    }
  }

}
