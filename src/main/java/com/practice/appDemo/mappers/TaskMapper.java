package com.practice.appDemo.mappers;

import com.practice.appDemo.domain.dtos.TaskDto;
import com.practice.appDemo.domain.entities.Task;

public interface TaskMapper {

    Task fromDto(TaskDto taskDto);

    TaskDto toDto(Task task);


}
