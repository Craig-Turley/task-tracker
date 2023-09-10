package com.example.demo.objects;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id")
    long id;
    @Column(name="task_title")
    String title;
    @Column(name="date")
    LocalDate date;
    @Column(name="time")
    String time;
    @Column(name="task_type")
    String taskType;

    @Enumerated(EnumType.STRING)
    @Column(name="task_status")
    TaskStatus taskStatus;

    @Column(name="priority", nullable = true)
    Integer priority;

    @Column(name="location", nullable = true)
    String location;

    public Task(){};

    public long getId() { return id; }

    public void setId(long id) { this.id = id; }

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