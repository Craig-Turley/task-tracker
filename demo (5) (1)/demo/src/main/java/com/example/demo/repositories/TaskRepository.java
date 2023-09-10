package com.example.demo.repositories;

import com.example.demo.objects.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository <Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.title LIKE CONCAT('%', ?1, '%')")
    public Iterable<Task> search(String keyword);

    @Query("SELECT t FROM Task t WHERE t.taskType LIKE 'work'")
    public Iterable<Task> workTasks();

    @Query("SELECT t FROM Task t WHERE t.taskType LIKE 'personal'")
    public Iterable<Task> personalTasks();
}
