import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskStatus } from 'src/app/TaskStatus.enum';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  apiUrl: string = 'http://localhost:8080';

  id: number = 0;
  task: string = "";
  date: Date = new Date();
  time: string = "";
  taskType: string = "";
  taskStatus: TaskStatus = TaskStatus.CREATED;
  location?: string;
  priority?: number;

  isWorkTask: boolean = false;
  isPersonalTask: boolean = false;
  showPriority: boolean = false;
  showLocation: boolean = false;

  showEditTask?: boolean;
  subscription?: Subscription;

  constructor(private uiService:UiService, private taskService: TaskService) {
    this.subscription = this.uiService
    .onEditToggle()
    .subscribe((value) => {
      this.showEditTask = value.show;
      if(value.task) {
        this.id = value.task.id;
        this.task = value.task.title;
        this.date = value.task.date;
        this.time = value.task.time;
        this.taskType = value.task.taskType;
        this.taskStatus = value.task.taskStatus;
        this.location = value.task.location;  // Added this
        this.priority = value.task.priority;  // Added this

        this.isWorkTask = this.taskType === 'work';
        this.isPersonalTask = this.taskType === 'personal';

        this.onTaskTypeChange();
      }
    });
  }

  onSubmit(){

    if(!this.task){
      alert('Please add a task!');
      return;
    }

    if(this.isWorkTask && this.isPersonalTask){
      alert('Choose either work OR personal!');
      return;
    }
    else if(this.isWorkTask){
      this.taskType = "work";
    }
    else if(this.isPersonalTask){
      this.taskType = "personal";
    }
    else {
      alert('Please choose a task type!');
      return;
    }

    const updatedTask: any = {
      id: this.id,  // Ensure the ID is added if necessary
      title: this.task,
      date: this.date,
      time: this.time,
      taskType: this.taskType,
      taskStatus: TaskStatus.CREATED
    };

    if (this.isWorkTask) {
      updatedTask.priority = this.priority;
      updatedTask.location = null;  // setting location as null for work task
    } else if (this.isPersonalTask) {
      updatedTask.location = this.location;
      updatedTask.priority = null;  // setting priority as null for personal task
    }

    this.taskService.editTask(updatedTask)
    .then(() => {
      console.log('Task Update Successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });

    this.uiService.toggleEditTask(updatedTask);
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
