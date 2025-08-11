package com.practice.appDemo.repositories;

import com.practice.appDemo.domain.entities.Task;
import com.practice.appDemo.domain.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, UUID> {

}
