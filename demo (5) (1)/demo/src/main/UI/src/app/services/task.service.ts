import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../Task';
import {WorkTask} from "../WorkTask";
import {PersonalTask} from "../PersonalTask";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseURL: string = "http://localhost:8080"
  private taskSubject = new BehaviorSubject<Task[]>([]);
  private workTaskSubject: BehaviorSubject<WorkTask[]> = new BehaviorSubject<WorkTask[]>([]);
  private personalTaskSubject: BehaviorSubject<PersonalTask[]> = new BehaviorSubject<PersonalTask[]>([]);
  tasks$ = this.taskSubject.asObservable();
  workTasks$ :Observable<WorkTask[]> = this.workTaskSubject.asObservable();
  personalTasks$:Observable<PersonalTask[]> = this.personalTaskSubject.asObservable();


  async fetchTasks(URL: string){
    try{
      const response = await fetch(URL + "/getTasks")
      if (!response.ok){
        throw new Error('GetTasks response was not ok');
      }
      const data = await response.json();
      return data;
    } catch(error){
      console.error("Error fetching data:", error);
      throw error;
    }

  }

  async fetchWorkTasks(URL: string): Promise<any> {
    try {
      const response: Response = await fetch(URL + "/getTasks/workTasks")
      if(!response.ok){
        throw new Error('GetWorkTasks response was not ok');
      }
      const data = await response.json();
      return data;
    } catch(error){
      console.error('Error', error);
      throw error;
    }
  }

  async fetchPersonalTasks(URL: string): Promise<any> {
    try {
      const response: Response = await fetch(URL + "/getTasks/personalTasks")
      if(!response.ok){
        throw new Error('GetPersonalTasks response was not ok');
      }
      const data = await response.json();
      return data;
    } catch(error){
      console.error('Error', error);
      throw error;
    }
  }

  async searchTask(URL: string, keyword: string){
    try {
      const response = await fetch(URL + "/getTasks/" + keyword);
      if(!response.ok){
        throw new Error('searchTasks response was not ok');
      }
      const data = await response.json();
      return data;
    } catch(error) {
      console.error("Error:", error);
      throw error;
    }
  }

  getTasks() {
    this.fetchTasks(this.baseURL)
      .then(data => {
        this.taskSubject.next(data); // This will emit the new data to all subscribers.
        // console.log('Fetched Tasks data:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getWorkTasks(): void {
    this.fetchWorkTasks(this.baseURL)
      .then(data => {
        this.workTaskSubject.next(data);
        // console.log('Fetched WorkTasks data:', data);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  getPersonalTasks() {
    this.fetchPersonalTasks(this.baseURL)
      .then(data => {
        this.personalTaskSubject.next(data);
        // console.log('Fetched PersonalTasks data:', data);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  searchTasks(keyword: string){
    this.searchTask(this.baseURL, keyword)
    .then(data => {
      this.taskSubject.next(data);
      this.workTaskSubject.next(this.filterWorkTasks(data));
      this.personalTaskSubject.next(this.filterPersonalTasks(data));
      console.log('Searched data:', data);
    })
    .catch(error => {
      console.error('Error searching data:', error);
    })
  }

  async addTask(task: Task): Promise<void> {
    const response = await fetch(`${this.baseURL}/postTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error('AddTask response was not ok');
    }

    const newTask = await response.json();

    // Add the new task to the current task list and emit the updated list.
    const updatedTasks = [...this.taskSubject.value, newTask];
    this.taskSubject.next(updatedTasks);
    this.workTaskSubject.next(this.filterWorkTasks(updatedTasks));
    this.personalTaskSubject.next(this.filterPersonalTasks(updatedTasks));
  }

  async editTask(task: Task): Promise<void> {
    const response = await fetch(`${this.baseURL}/updateTask/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error('EditTask response was not ok');
    }

    const updatedTask = await response.json();

    // Replace the old task with the updated task in the task list and emit the updated list.
    const updatedTasks = this.taskSubject.value.map(t => t.id === task.id ? updatedTask : t);
    this.taskSubject.next(updatedTasks);
    this.workTaskSubject.next(this.filterWorkTasks(updatedTasks));
    this.personalTaskSubject.next(this.filterPersonalTasks(updatedTasks));
  }

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/deleteTask/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('DeleteTask response was not ok');
    }

    // Filter out the deleted task and emit the updated list.
    const updatedTasks = this.taskSubject.value.filter(task => task.id !== id);
    this.taskSubject.next(updatedTasks);
    this.workTaskSubject.next(this.filterWorkTasks(updatedTasks));
    this.personalTaskSubject.next(this.filterPersonalTasks(updatedTasks));
  }
  filterWorkTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => task.taskType === 'work');
  }

  filterPersonalTasks(tasks : Task[]): Task[] {
    return tasks.filter(task => task.taskType === 'personal');
  }

  constructor() { }
}
