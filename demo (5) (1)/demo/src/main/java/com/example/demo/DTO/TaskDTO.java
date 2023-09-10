package com.example.demo.DTO;

import com.example.demo.objects.TaskStatus;

import java.time.LocalDate;
import java.util.Date;

public class TaskDTO {

    long id;
    String title;
    LocalDate date;
    String time;
    String taskType;
    TaskStatus taskStatus;
    Integer priority;
    String location;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTime() { return time; }

    public void setTime(String time) { this.time = time; }

    public String getTaskType() { return taskType; }

    public void setTaskType(String taskType) { this.taskType = taskType; }

    public TaskStatus getTaskStatus() { return taskStatus; }

    public void setTaskStatus(TaskStatus taskStatus) { this.taskStatus = taskStatus; }

    public Integer getPriority() { return priority; }

    public void setPriority(Integer priority) { this.priority = priority; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

}
