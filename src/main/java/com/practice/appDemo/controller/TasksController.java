package com.practice.appDemo.controller;

import com.practice.appDemo.domain.dtos.TaskDto;
import com.practice.appDemo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/task-lists/{task_list_id}/tasks")
public class TasksController {

    private final TaskService taskService;

    @Autowired
    public TasksController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskDto> listTasks(@PathVariable("task_list_id")UUID taskListId){

        return taskService.listTasks(taskListId);
    }

    @PostMapping
    public TaskDto createTask(@PathVariable("task_list_id")UUID taskListId, @RequestBody TaskDto taskDto){
        return taskService.createTask(taskListId, taskDto);
    }

    @GetMapping(path = "/{task_id}")
    public TaskDto getTask(@PathVariable("task_list_id")UUID taskListId, @PathVariable("task_id")UUID taskId){
        return taskService.getTask(taskListId, taskId);
    }

    @PutMapping(path = "/{task_id}")
    public TaskDto updateTask(@PathVariable("task_list_id")UUID taskListId, @PathVariable("task_id")UUID taskId, @RequestBody TaskDto taskDto){
        return taskService.updateTask(taskListId, taskId, taskDto);
    }

    @DeleteMapping(path = "/{task_id}")
    public void deleteTask(@PathVariable("task_list_id")UUID taskListId, @PathVariable("task_id")UUID taskId){
        taskService.deleteTask(taskListId, taskId);
    }

}
