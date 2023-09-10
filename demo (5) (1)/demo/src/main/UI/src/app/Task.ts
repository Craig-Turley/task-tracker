import { TaskStatus } from "./TaskStatus.enum";

export interface Task {
    id?: number;
    title: string;
    date: Date;
    taskType : string;
    time: string;
    taskStatus: TaskStatus;
}