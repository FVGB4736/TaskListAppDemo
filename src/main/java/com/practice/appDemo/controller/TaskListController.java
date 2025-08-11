package com.practice.appDemo.controller;

import com.practice.appDemo.domain.dtos.TaskListDto;
import com.practice.appDemo.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/task-lists")
public class TaskListController {

    private final TaskListService taskListService;

    public TaskListController(TaskListService taskListService) {
        this.taskListService = taskListService;
    }


    @GetMapping
    public List<TaskListDto> listTaskLists(){
        return taskListService.listTaskLists();
    }

    @PostMapping
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto){
        TaskListDto savedTaskListDto = taskListService.createTaskList(taskListDto);
        return savedTaskListDto;
    }

    @GetMapping(path = "/{task_list_id}")
    public Optional<TaskListDto> getTaskList(@PathVariable("task_list_id") UUID taskListId){
        return taskListService.getTaskList(taskListId);
    }

    @PutMapping(path = "/{task_list_id}")
    public TaskListDto updateTaskList(@PathVariable("task_list_id") UUID taskListId, @RequestBody TaskListDto taskListDto){
        return taskListService.updateTaskList(taskListId, taskListDto);
    }

    @DeleteMapping(path = "/{task_list_id}")
    public void deleteTaskList(@PathVariable("task_list_id") UUID taskListId){
        taskListService.deleteTaskList(taskListId);
    }

}
