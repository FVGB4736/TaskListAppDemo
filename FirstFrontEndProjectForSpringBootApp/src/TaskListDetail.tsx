import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface TaskListDto {
  id: string;
  title: string;
  description: string;
  count: number;
  progress: number;
  tasks: TaskDto[];
}

interface TaskDto {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

const TaskListDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState<TaskListDto | null>(location.state?.taskList || null);
  const taskListId = taskList?.id || location.state?.taskListId || '';

  useEffect(() => {
      const fetchTaskList = async () => {
        try {
          const response = await fetch(`/task-lists/${taskListId}`);
          if (response.ok) {
            const data = await response.json();
            setTaskList(data);
          } else {
            console.error('獲取任務列表失敗，狀態碼:', response.status, await response.text());
            navigate('/');
          }
        } catch (error) {
          console.error('獲取任務列表時發生錯誤:', error);
          navigate('/');
        }
      };
      if (taskListId) fetchTaskList();
    }, [taskListId, navigate]);

  if (!taskList) return <div>載入中...</div>;


  // 處理刪除邏輯
    const handleDelete = async () => {
      if (window.confirm('確定要刪除此任務列表？此操作無法復原！')) {
        try {
          const response = await fetch(`/task-lists/${taskList.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            navigate('/'); // 刪除成功後返回 App 頁面
          } else {
            console.error('刪除任務列表失敗，狀態碼:', response.status, await response.text());
          }
        } catch (error) {
          console.error('刪除時發生錯誤:', error);
        }
      }
    };


  //跳轉至Task細節頁面
  const handleTaskClick = (taskId: string) => {
    navigate(`/TaskDetail`, { state: { taskListId: taskList.id, taskId } });
  };




  return (
    <div className="container">
      <h1>任務清單詳情</h1>
      <h2>標題: {taskList.title}</h2>
      <p>描述: {taskList.description}</p>
      <p>任務數量: {taskList.count}</p>
      <p>進度: {taskList.progress}%</p>


      {/* 新增任務按鈕，放在任務列表上方 */}
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => navigate('/CreateTask', { state: { taskListId: taskList.id } })}
          >
            新增任務
          </button>
        </div>

      <h3>任務列表</h3>
      <table className="table">
        <thead>
          <tr>
            <th>標題</th>
            <th>描述</th>
            <th>到期日期</th>
            <th>優先級</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          {taskList.tasks && taskList.tasks.map((task, index) => (
            <tr key={task.id || index} onClick={() => handleTaskClick(task.id)} style={{ cursor: 'pointer' }}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="button button-secondary" onClick={() => navigate('/')}>返回</button>

      <button
        className="button button-secondary"
        onClick={() => navigate('/UpdateTaskList', { state: taskList })}
      >
        修改
      </button>

      <button
        className="button ml-2 bg-red-600 hover:bg-red-700" // 紅色按鈕，增加視覺警告
        onClick={handleDelete}
      >
        刪除
      </button>

    </div>
  );
};

export default TaskListDetail;