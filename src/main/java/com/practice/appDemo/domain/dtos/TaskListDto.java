package com.practice.appDemo.domain.dtos;

import com.practice.appDemo.domain.entities.Task;

import java.util.List;
import java.util.UUID;

public record TaskListDto(UUID id,
                          String title,
                          String description,
                          //清單中的任務樹目
                          Integer count,
                          //完成的任務數目
                          Double progress,
                          List<TaskDto> tasks
) {
}
