package com.example.demo.controllers;

import com.example.demo.DTO.TaskDTO;
import com.example.demo.objects.Task;
import com.example.demo.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TasksControllerTest {

    @InjectMocks
    private TasksController tasksController;

    @Mock
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetTasks() {
        Task task = new Task();
        task.setTitle("Test Task");
        List<Task> tasksList = new ArrayList<>();
        tasksList.add(task);

        when(taskRepository.findAll()).thenReturn(tasksList);

        ResponseEntity<ArrayList<TaskDTO>> response = tasksController.getTasks();
        assertNotNull(response);
        assertEquals(1, response.getBody().size());
        assertEquals("Test Task", response.getBody().get(0).getTitle());

        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testSearchTasks() {
        // You can add similar tests for searchTasks, getWorkTasks, getPersonalTasks, etc.
        Task task = new Task();
        task.setTitle("Test Task");
        List<Task> tasksList = new ArrayList<>();
        tasksList.add(task);

        when(taskRepository.search("Test")).thenReturn(tasksList);

        ResponseEntity<ArrayList<TaskDTO>> response = tasksController.searchTasks("Test");
        assertNotNull(response);
        assertEquals(1, response.getBody().size());
        assertEquals("Test Task", response.getBody().get(0).getTitle());

        verify(taskRepository, times(1)).search("Test");
    }

    @Test
    void testGetWorkTasks() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setTaskType("work");
        List<Task> tasksList = new ArrayList<>();
        tasksList.add(task);

        when(taskRepository.workTasks()).thenReturn(tasksList);

        ResponseEntity<ArrayList<TaskDTO>> response = (ResponseEntity<ArrayList<TaskDTO>>) tasksController.getWorkTasks();
        assertNotNull(response);
        assertEquals(1, response.getBody().size());
        assertEquals("work", response.getBody().get(0).getTaskType());

        verify(taskRepository, times(1)).workTasks();
    }

    @Test
    void getPersonalTasks(){
        Task task = new Task();
        task.setTitle("Test Task");
        task.setTaskType("personal");
        List<Task> tasksList = new ArrayList<>();
        tasksList.add(task);

        when(taskRepository.personalTasks()).thenReturn(tasksList);

        ResponseEntity<ArrayList<TaskDTO>> response = (ResponseEntity<ArrayList<TaskDTO>>) tasksController.getPersonalTasks();
        assertNotNull(response);
        assertEquals(1, response.getBody().size());
        assertEquals("personal", response.getBody().get(0).getTaskType());

        verify(taskRepository, times(1)).personalTasks();
    }

    @Test
    void testPostTask() {
        // Set up the input and expected output
        TaskDTO inputTaskDTO = new TaskDTO();
        inputTaskDTO.setTitle("New Task");
        Task expectedTask = new Task();
        expectedTask.setTitle(inputTaskDTO.getTitle());
        when(taskRepository.save(any(Task.class))).thenReturn(expectedTask);

        // Call the method
        ResponseEntity<?> response = tasksController.postTask(inputTaskDTO);

        // Assert the results
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof Task);
        assertEquals("New Task", ((Task) response.getBody()).getTitle());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testUpdateTask_ExistingTask() {
        // Set up the input and expected output
        long id = 1;
        TaskDTO updateTaskDTO = new TaskDTO();
        updateTaskDTO.setTitle("Updated Task");
        Optional<Task> optionalTask = Optional.of(new Task());
        when(taskRepository.findById(id)).thenReturn(optionalTask);
        Task expectedUpdatedTask = new Task();
        expectedUpdatedTask.setTitle(updateTaskDTO.getTitle());
        when(taskRepository.save(any(Task.class))).thenReturn(expectedUpdatedTask);

        // Call the method
        ResponseEntity<?> response = tasksController.updateTask(id, updateTaskDTO);

        // Assert the results
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof Task);
        assertEquals("Updated Task", ((Task) response.getBody()).getTitle());
        verify(taskRepository, times(1)).findById(id);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testUpdateTask_NonExistingTask() {
        // Set up the input and expected output
        long id = 1;
        TaskDTO updateTaskDTO = new TaskDTO();
        Optional<Task> optionalTask = Optional.empty();
        when(taskRepository.findById(id)).thenReturn(optionalTask);

        // Call the method
        ResponseEntity<?> response = tasksController.updateTask(id, updateTaskDTO);

        // Assert the results
        assertNotNull(response);
        assertEquals(404, response.getStatusCodeValue()); // Not Found
        verify(taskRepository, times(1)).findById(id);
        verify(taskRepository, times(0)).save(any(Task.class)); // No save should occur
    }

    @Test
    void testDeleteTask() {
        long id = 1;

        // Call the method
        ResponseEntity<?> response = tasksController.deleteTask(id);

        // Assert the results
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue()); // OK
        assertEquals(204, response.getBody()); // No Content
        verify(taskRepository, times(1)).deleteById(id);
    }

}