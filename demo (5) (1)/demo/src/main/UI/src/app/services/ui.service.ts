import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, Subject } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>;

  private filterByType: boolean = false;
  private filterSubject: Subject<any> = new Subject<any>;

  private showEditTask: boolean = false;
  private editSubject = new Subject<any>;
  private currentTask: Task | null = null;

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  toggleFilterByType(): void {
    this.filterByType = !this.filterByType;
    this.filterSubject.next(this.filterByType);
  }

  toggleEditTask(task: Task): void {
    this.showEditTask = !this.showEditTask;
    this.currentTask = task;
    this.editSubject.next({ show: this.showEditTask, task: this.currentTask });
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  onFilterToggle(): Observable<any> {
    return this.filterSubject.asObservable();
  }

  onEditToggle(): Observable<any> {
    return this.editSubject.asObservable();
  }
}
