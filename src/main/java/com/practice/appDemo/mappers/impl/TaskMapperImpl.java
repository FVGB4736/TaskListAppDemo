package com.practice.appDemo.mappers.impl;

import com.practice.appDemo.domain.dtos.TaskDto;
import com.practice.appDemo.domain.entities.Task;
import com.practice.appDemo.mappers.TaskMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImpl implements TaskMapper {

    @Override
    public Task fromDto(TaskDto taskDto) {


        return new Task(

                //JAVA中的RECORD直接用屬性名取得屬性
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueTime(),
                task.getPriority(),
                task.getStatus()

        );
    }
}
