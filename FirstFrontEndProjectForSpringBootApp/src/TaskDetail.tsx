import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface TaskDto {
  id: string;
  title: string;
  description: string;
  dueDate: string; // 前端使用字符串，後端轉為 LocalDateTime
  priority: string;
  status: string;
}

const TaskDetail: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const taskListId  = location.state.taskListId || '' ;
  const taskId = location.state.taskId || '';

  const [task, setTask] = useState<TaskDto>({
    id: taskId || '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'OPEN',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/task-lists/${taskListId}/tasks/${taskId}`);
        if (response.ok) {
          const data = await response.json();
          // 格式化 dueDate 為 datetime-local 兼容格式
          const formattedTask = {
            ...data,
            dueDate: data.dueDate ? new Date(data.dueDate).toISOString().slice(0, -1) : '', // 移除 'Z'，兼容 datetime-local
          };
          setTask(formattedTask);
        } else {
          console.error('獲取任務失敗，狀態碼:', response.status, await response.text());
        }
      } catch (error) {
        console.error('獲取任務時發生錯誤:', error);
      }
    };
    if (taskId) fetchTask();
  }, [taskId, taskListId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate(`/TaskListDetail`, { state: { taskListId : taskListId } });
  };

  const handleUpdate = async () => {
    const formattedTask = {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : '',
    };
    try {
      const response = await fetch(`/task-lists/${taskListId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedTask),
      });
      if (response.ok) {
        navigate(`/TaskListDetail`, { state: { taskListId: taskListId, taskId } });
      } else {
        console.error('更新任務失敗，狀態碼:', response.status, await response.text());
      }
    } catch (error) {
      console.error('更新時發生錯誤:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/task-lists/${taskListId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        navigate(`/TaskListDetail`, { state: { taskListId: taskListId, taskId } });
      } else {
        console.error('刪除任務失敗，狀態碼:', response.status, await response.text());
      }
    } catch (error) {
      console.error('刪除時發生錯誤:', error);
    }
  };

  return (
    <div className="container">
      <h1>任務詳情</h1>
      <div className="mb-4">
        <label className="block">標題:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">描述:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">到期日期和時間:</label>
        <input
          type="datetime-local"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">優先級:</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="HIGH">高</option>
          <option value="MEDIUM">中</option>
          <option value="LOW">低</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block">狀態:</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="OPEN">開放</option>
          <option value="CLOSED">關閉</option>
        </select>
      </div>

      <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleBack}>
        上一頁
      </button>
      <button
        className="px-4 py-2 ml-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        更新
      </button>

      <button
              className="px-4 py-2 ml-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleDelete}
            >
              刪除
            </button>

    </div>
  );
};

export default TaskDetail;