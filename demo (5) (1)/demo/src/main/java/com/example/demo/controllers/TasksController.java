package com.example.demo.controllers;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.objects.Task;
import com.example.demo.repositories.TaskRepository;
import jakarta.transaction.UserTransaction;
import org.apache.coyote.Response;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class TasksController {

    private TaskRepository taskRepository;

    public TasksController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @GetMapping("/getTasks")
    public ResponseEntity<ArrayList<TaskDTO>> getTasks(){

        Iterable<Task> tasksIterable = taskRepository.findAll();
        ArrayList<TaskDTO> tasks = new ArrayList<>();

        for(Task task : tasksIterable){
            tasks.add(convertToDTO(task));
        }

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/getTasks/{keyword}")
    public ResponseEntity<ArrayList<TaskDTO>> searchTasks(@PathVariable String keyword){

        Iterable<Task> taskIterable = taskRepository.search(keyword);
        ArrayList<TaskDTO> tasks = new ArrayList<>();

        for(Task task : taskIterable){
            tasks.add(convertToDTO(task));
        }

        return ResponseEntity.ok(tasks);

    }

    @GetMapping("/getTasks/workTasks")
    public ResponseEntity<?> getWorkTasks(){

        Iterable<Task> taskIterable = taskRepository.workTasks();
        ArrayList<TaskDTO> tasks = new ArrayList<>();

        for(Task task: taskIterable){
            tasks.add(convertToDTO(task));
        }

        return ResponseEntity.ok(tasks);

    }

    @GetMapping("/getTasks/personalTasks")
    public ResponseEntity<?> getPersonalTasks(){

        Iterable<Task> taskIterable = taskRepository.personalTasks();
        ArrayList<TaskDTO> tasks = new ArrayList<>();

        for(Task task : taskIterable){
            tasks.add(convertToDTO(task));
        }

        return ResponseEntity.ok(tasks);

    }

    public TaskDTO convertToDTO(Task task){

        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setTitle(task.getTitle());
        taskDTO.setDate(task.getDate());
        taskDTO.setTime(task.getTime());
        taskDTO.setTaskType(task.getTaskType());
        taskDTO.setTaskStatus(task.getTaskStatus());
        taskDTO.setPriority(task.getPriority());
        taskDTO.setLocation(task.getLocation());

        return taskDTO;

    }

    @PostMapping("/postTask")
    public ResponseEntity<?> postTask(@RequestBody TaskDTO taskDTO){

        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDate(taskDTO.getDate());
        task.setTime(taskDTO.getTime());
        task.setTaskType(taskDTO.getTaskType());
        task.setTaskStatus(taskDTO.getTaskStatus());
        task.setPriority(taskDTO.getPriority());
        task.setLocation(taskDTO.getLocation());

        this.taskRepository.save(task);

        return ResponseEntity.ok(task);

    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<?> updateTask(@PathVariable long id, @RequestBody TaskDTO taskDTO){
        Optional<Task> taskOptional = taskRepository.findById(id);
        if(taskOptional.isPresent()){
            Task updatedTask = new Task();
            updatedTask.setId(taskDTO.getId());
            updatedTask.setTitle(taskDTO.getTitle());
            updatedTask.setDate(taskDTO.getDate());
            updatedTask.setTime(taskDTO.getTime());
            updatedTask.setTaskType(taskDTO.getTaskType());
            updatedTask.setTaskStatus(taskDTO.getTaskStatus());
            updatedTask.setPriority(taskDTO.getPriority());
            updatedTask.setLocation(taskDTO.getLocation());

            this.taskRepository.save(updatedTask);
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable long id){

        this.taskRepository.deleteById(id);

        return ResponseEntity.ok(204);

    }
}
