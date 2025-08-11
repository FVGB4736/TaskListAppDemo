package com.practice.appDemo.controller;

import com.practice.appDemo.domain.entities.TaskPriority;
import com.practice.appDemo.domain.entities.TaskStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/enums")
public class EnumController {

    @GetMapping
    public Map<String, List<Option>> getEnums() {
        Map<String, List<Option>> enums = new HashMap<>();

        enums.put("priorities", Arrays.stream(TaskPriority.values())
                .map(priority -> new Option(priority.name(), getDisplayName(priority)))
                .collect(Collectors.toList()));

        enums.put("statuses", Arrays.stream(TaskStatus.values())
                .map(status -> new Option(status.name(), getDisplayName(status)))
                .collect(Collectors.toList()));

        return enums;
    }

    private String getDisplayName(Enum<?> enumValue) {
        if (enumValue instanceof TaskPriority) {
            return switch ((TaskPriority) enumValue) {
                case HIGH -> "高";
                case MEDIUM -> "中";
                case LOW -> "低";
                default -> enumValue.name();
            };
        } else if (enumValue instanceof TaskStatus) {
            return switch ((TaskStatus) enumValue) {
                case OPEN -> "開放";
                case CLOSED -> "關閉";
                default -> enumValue.name();
            };
        }
        return enumValue.name(); // 預設返回 enum 名稱
    }


}

record Option(String value, String label) {}
