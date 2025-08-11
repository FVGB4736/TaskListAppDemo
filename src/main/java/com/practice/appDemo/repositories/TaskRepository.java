package com.practice.appDemo.repositories;

import com.practice.appDemo.domain.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    //    Spring Data JPA 從方法名稱中的 TaskListId 推斷：
//    TaskList 對應 Task 實體的 taskList 屬性。
//    Id 對應 TaskList 實體的主鍵（id）。
//    通過 @JoinColumn(name = "task_list_id")，Spring Data JPA 知道查詢 tasks 表中的 task_list_id 欄位。
    List<Task> findByTaskListId (UUID taskListId);


    Optional<Task> findByTaskListIdAndId(UUID taskListId, UUID id);

    void deleteByTaskListIdAndId(UUID taskListId, UUID id);
}
