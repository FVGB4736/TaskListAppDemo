package com.practice.appDemo.mappers.impl;

import com.practice.appDemo.domain.dtos.TaskListDto;
import com.practice.appDemo.domain.entities.Task;
import com.practice.appDemo.domain.entities.TaskList;
import com.practice.appDemo.domain.entities.TaskStatus;
import com.practice.appDemo.mappers.TaskListMapper;
import com.practice.appDemo.mappers.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TaskListMapperImpl implements TaskListMapper {

    private final TaskMapper taskMapper;

    @Autowired
    public TaskListMapperImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskList fromDto(TaskListDto taskListDto) {
        return new TaskList(
                taskListDto.id(),
                taskListDto.title(),
                taskListDto.description(),
                Optional.ofNullable(taskListDto.tasks())
                        .map(task -> task.stream().map(taskMapper::fromDto).toList())
                        .orElse(null),
                null,
                null

        );
    }

    @Override
    public TaskListDto toDto(TaskList taskList) {



        return new TaskListDto(
                taskList.getId(),
                taskList.getTitle(),
                taskList.getDescription(),
                //總任務數
                Optional.ofNullable(taskList.getTasks())
                        .map(List :: size)
                        .orElse(0),
                //計算總進度
                this.calculateTaskListPregress(taskList.getTasks()),
                Optional.ofNullable(taskList.getTasks()).map(tasks -> tasks.stream().map(taskMapper::toDto).toList())
                        .orElse(null)

        );
    }


    private Double calculateTaskListPregress(List<Task> tasks){

        if(tasks == null){
            return null;
        }

        long closedTaskCount = tasks.stream().filter(task -> TaskStatus.CLOSED == task.getStatus()).count();
        return (double) closedTaskCount/tasks.size();
    }
}
