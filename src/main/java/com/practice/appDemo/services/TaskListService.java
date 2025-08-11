package com.practice.appDemo.services;

import com.practice.appDemo.domain.dtos.TaskListDto;
import com.practice.appDemo.domain.entities.TaskList;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskListService {
    List<TaskListDto> listTaskLists();

    TaskListDto createTaskList(TaskListDto taskListDto);

    Optional<TaskListDto> getTaskList(UUID id);

    TaskListDto updateTaskList(UUID taskListId, TaskListDto taskListDto);

    void deleteTaskList(UUID taskListId);
}
