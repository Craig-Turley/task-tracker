import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from "../../services/task.service";
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  filterByType?: boolean;
  filterByTypeSubscription?: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.filterByTypeSubscription = this.uiService
      .onFilterToggle()
      .subscribe((value) => this.filterByType = value);
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(data => {
      this.tasks = data;
    });
    this.taskService.getTasks();
  }

}
