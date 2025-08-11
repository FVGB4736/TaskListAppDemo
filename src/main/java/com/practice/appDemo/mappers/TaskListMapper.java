package com.practice.appDemo.mappers;

import com.practice.appDemo.domain.dtos.TaskListDto;
import com.practice.appDemo.domain.entities.TaskList;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}
