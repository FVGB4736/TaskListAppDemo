package com.practice.appDemo.domain.dtos;

import com.practice.appDemo.domain.entities.TaskPriority;
import com.practice.appDemo.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(UUID id, String title, String description, LocalDateTime dueDate, TaskPriority priority, TaskStatus status) {
}
