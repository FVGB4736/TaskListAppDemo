package com.practice.appDemo.services.impl;

import ch.qos.logback.core.util.StringUtil;
import com.practice.appDemo.domain.dtos.TaskDto;
import com.practice.appDemo.domain.entities.Task;
import com.practice.appDemo.domain.entities.TaskList;
import com.practice.appDemo.mappers.TaskMapper;
import com.practice.appDemo.repositories.TaskListRepository;
import com.practice.appDemo.repositories.TaskRepository;
import com.practice.appDemo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    private TaskListRepository taskListRepository;

    private TaskMapper taskMapper;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository,TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
        this.taskMapper = taskMapper;
    }


    @Override
    public List<TaskDto> listTasks(UUID taskListId) {

        List<Task> tasks = taskRepository.findByTaskListId(taskListId);

        return tasks.stream().map(taskMapper ::toDto).toList();
    }

    @Override
    public TaskDto createTask(UUID taskListId, TaskDto taskDto) {

        if(null != taskDto.id()){
            throw new IllegalArgumentException("Task ID already exist!");
        }

        if(StringUtil.isNullOrEmpty(taskDto.title())){
            throw new IllegalArgumentException("Task title must not be empty!");
        }

        //先找到對應的任務清單
        Optional<TaskList> foundTaskList = taskListRepository.findById(taskListId);

        //檢查任務清單是否存在
        if(! foundTaskList.isPresent()){
            throw new IllegalArgumentException("Task List does not exist!");
        }

        LocalDateTime now = LocalDateTime.now();
        Task taskToSave = new Task(
                null,
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                //將任務清單欄位加入到任務中
                foundTaskList.get(),
                //設定建立時間
                now,
                //設定更新時間
                now

        );

        Task savedTask = taskRepository.save(taskToSave);
        return taskMapper.toDto(savedTask);
    }

    @Override
    public TaskDto getTask(UUID taskListId, UUID taskId) {
        Task checkedTask = this.checkTaskListIdAndTaskIdIsRelated(taskListId, taskId);

        return taskMapper.toDto(checkedTask);


    }

    @Override
    public TaskDto updateTask(UUID taskListId, UUID taskId, TaskDto taskDto) {

        Task checkedTask = this.checkTaskListIdAndTaskIdIsRelated(taskListId, taskId);
        checkedTask.setTitle(taskDto.title());
        checkedTask.setDescription(taskDto.description());
        checkedTask.setPriority(taskDto.priority());
        checkedTask.setStatus(taskDto.status());
        checkedTask.setUpdated(LocalDateTime.now());

        Task savedTask = taskRepository.save(checkedTask);

        return taskMapper.toDto(savedTask);
    }

    @Transactional
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        Task checkedTask = this.checkTaskListIdAndTaskIdIsRelated(taskListId, taskId);
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }

    private Task checkTaskListIdAndTaskIdIsRelated(UUID taskListId, UUID taskId){
        if(null == taskListId || null == taskId){
            throw new IllegalArgumentException("Task List ID or Task ID is null!");
        }

        Optional<TaskList> checkedTaskList = taskListRepository.findById(taskListId);
        Optional<Task> checkedTask = taskRepository.findById(taskId);


        if(!checkedTaskList.isPresent() || !checkedTask.isPresent()){
            throw new IllegalArgumentException("Task List or Task is not found!");
        }


        //比對TaskList的ID，和Task上的TaskList的ID是否相同
        if(!checkedTaskList.get().getId().equals(checkedTask.get().getTaskList().getId())){
            throw new IllegalArgumentException("This Task does not belong to the Task List!");
        }

        return checkedTask.get();
    }
}
