import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  keyword: string = "";

  constructor(private taskService: TaskService, private uiService: UiService){
  }

  searchTask(){
    console.log('Searching ' + this.keyword);
    this.taskService.searchTasks(this.keyword);
  }

  clearSearch(){
    console.log('Clearing');
    this.keyword = "";
    this.taskService.getTasks();
    this.taskService.getWorkTasks();
    this.taskService.getPersonalTasks();
  }

  toggleFilterByType(){
    this.uiService.toggleFilterByType();
  }

}
