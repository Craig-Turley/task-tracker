import {Component, OnInit} from '@angular/core';
import {WorkTask} from "../../WorkTask"
import {PersonalTask} from "../../PersonalTask";
import {TaskService} from "../../services/task.service";
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-personal-work-task',
  templateUrl: './personal-work-task.component.html',
  styleUrls: ['./personal-work-task.component.css']
})
export class PersonalWorkTaskComponent implements OnInit{

  workTasks: WorkTask[] = [];
  personalTasks: PersonalTask[] = [];

  filterByType?: boolean;
  filterByTypeSubscription?: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.filterByTypeSubscription = this.uiService
      .onFilterToggle()
      .subscribe((value) => this.filterByType = value);
  }

  ngOnInit(): void {
    this.taskService.workTasks$.subscribe(data => {
      console.log("Work tasks data:", data);
      // @ts-ignore
      this.workTasks = data.sort((a, b) => a.priority - b.priority);
    });
    this.taskService.getWorkTasks();

    this.taskService.personalTasks$.subscribe(data => {
      console.log("Personal tasks data:", data);
      this.personalTasks = data;
    })
    this.taskService.getPersonalTasks();
  }

}
