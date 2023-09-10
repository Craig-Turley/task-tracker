import {Component, OnInit} from '@angular/core';
import {WorkTask} from "../../WorkTask";
import {PersonalTask} from "../../PersonalTask";
import {Subscription} from "rxjs";
import {TaskService} from "../../services/task.service";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-report-task',
  templateUrl: './report-task.component.html',
  styleUrls: ['./report-task.component.css']
})
export class ReportTaskComponent implements OnInit{

  workTasks: WorkTask[] = [];
  personalTasks: PersonalTask[] = [];

  constructor(private taskService: TaskService) {}

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
