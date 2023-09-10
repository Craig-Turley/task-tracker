import { Time } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskStatus } from 'src/app/TaskStatus.enum';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  apiUrl: string = 'http://localhost:8080/postTask';

  title: string = "";
  date: Date = new Date();
  time: string = "";
  taskType: string = "";
  priority?: number;
  location?: string;

  isWorkTask: boolean = false;
  isPersonalTask: boolean = false;
  showPriority: boolean = false;
  showLocation: boolean = false;

  showAddTask?: boolean;
  subscription?: Subscription;

  constructor(private uiService:UiService, private taskService: TaskService) {
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddTask = value));
  }

  onSubmit(){

    if (!this.title) {
      alert('Please add a task!');
      return;
    }

    if (this.isWorkTask) {
      this.taskType = "work";
    } else if (this.isPersonalTask) {
      this.taskType = "personal";
    } else {
      alert('Please choose a task type!');
      return;
    }

    const newTask: any = {  // use 'any' type for flexibility, or create a custom interface
      title: this.title,
      date: this.date,
      time: this.time,
      taskType: this.taskType,
      taskStatus: TaskStatus.CREATED
    };

    if (this.isWorkTask) {
      newTask.priority = this.priority;
      newTask.location = null;  // setting location as null for work task
    } else if (this.isPersonalTask) {
      newTask.location = this.location;
      newTask.priority = null;  // setting priority as null for personal task
    }

    this.taskService.addTask(newTask)
    .then(() => {
      console.log('Task Added Successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });

    this.title = "";
    this.date = new Date();
    this.time = "";
    this.priority = undefined;
    this.location = undefined;
  }

  onTaskTypeChange() {
    if (this.isWorkTask && this.isPersonalTask) {
      alert('Choose either work OR personal!');
      this.isWorkTask = false;
      this.isPersonalTask = false;
      this.showPriority = false;
      this.showLocation = false;
      return;
    }

    if (this.isWorkTask) {
      this.showPriority = true;
      this.showLocation = false;
    } else if (this.isPersonalTask) {
      this.showLocation = true;
      this.showPriority = false;
    } else {
      this.showPriority = false;
      this.showLocation = false;
    }
  }

}
