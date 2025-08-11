package com.practice.appDemo.services.impl;

import ch.qos.logback.core.util.StringUtil;
import com.practice.appDemo.domain.dtos.TaskListDto;
import com.practice.appDemo.domain.entities.TaskList;
import com.practice.appDemo.mappers.TaskListMapper;
import com.practice.appDemo.repositories.TaskListRepository;
import com.practice.appDemo.services.TaskListService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {

    private TaskListRepository taskListRepository;

    private TaskListMapper taskListMapper;

    public TaskListServiceImpl(TaskListRepository taskListRepository, TaskListMapper taskListMapper) {
        this.taskListRepository = taskListRepository;
        this.taskListMapper = taskListMapper;
    }

    @Override
    public List<TaskListDto> listTaskLists() {
        return taskListRepository.findAll().stream().map(taskListMapper::toDto).toList();
    }

    @Transactional
    @Override
    public TaskListDto createTaskList(TaskListDto taskListDto) {

        if(taskListDto.id() != null){
            throw new IllegalArgumentException("Task list already has an id!");
        }

        if(StringUtil.isNullOrEmpty(taskListDto.title())){
            throw new IllegalArgumentException("Task list title must be present!");
        }


        LocalDateTime now = LocalDateTime.now();
        TaskList taskList = new TaskList(
                null,
                taskListDto.title(),
                taskListDto.description(),
                null,
                now,
                now

        );

        return taskListMapper.toDto(taskListRepository.save(taskList));
    }

    @Override
    public Optional<TaskListDto> getTaskList(UUID id) {

        // 使用 taskListRepository.findById(id) 查詢 TaskList，結果是 Optional<TaskList>
        return taskListRepository.findById(id)
                // 使用 Optional.map 將 TaskList 轉換為 TaskListDto，若無值則保持 Optional.empty()
                .map(taskListMapper::toDto);


    }

    @Transactional
    @Override
    public TaskListDto updateTaskList(UUID taskListId, TaskListDto taskListDto) {



        if(null == taskListDto.id()){
            throw new IllegalArgumentException("Task list ID does not exist!");
        }

        if(! Objects.equals(taskListDto.id(), taskListId)){
            throw new IllegalArgumentException("Task list ID doesn't match! Why!");
        }

        Optional<TaskList> checkTaskList = taskListRepository.findById(taskListId);
        if(! checkTaskList.isPresent()){
            throw new IllegalArgumentException("Task list not found");
        }



        TaskList existingTaskList = checkTaskList.get();
        existingTaskList.setTitle(taskListDto.title());
        existingTaskList.setDescription(taskListDto.description());
        existingTaskList.setUpdated(LocalDateTime.now());


        TaskList updatedTaskList = taskListRepository.save(existingTaskList);

        return taskListMapper.toDto(updatedTaskList);
    }

    @Override
    public void deleteTaskList(UUID taskListId) {
        taskListRepository.deleteById(taskListId);
    }
}
