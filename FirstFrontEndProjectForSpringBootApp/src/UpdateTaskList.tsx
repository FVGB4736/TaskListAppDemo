import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 導入 useNavigate

interface TaskListDto {
  id: string;
  title: string;
  description: string;
  count: number;
  progress: number;
  tasks: any[];
}


const UpdateTaskList: React.FC = () => {

  const location = useLocation(); // 獲取路由狀態

  const navigate = useNavigate(); // 定義 navigate 函數
  const taskList = location.state as TaskListDto; // 從 state 中獲取 taskList

  // 檢查 taskList 是否存在
    if (!taskList) {
      navigate('/');
      return null;
    }

  const [title, setTitle] = useState(taskList.title);
  const [description, setDescription] = useState(taskList.description);


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/task-lists/${taskList.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                ...taskList, // 保留原本taskList中的值
                title,          //取代taskList.title的值
                description,    //取代taskList.description
        }),
      });
      if (response.ok) {
        // 從回應中獲取更新後的 TaskList
        const updatedTaskList = await response.json();
        // 導航到 TaskListDetail，傳遞最新資料
        navigate('/TaskListDetail', { state: { taskList: updatedTaskList, taskListId:updatedTaskList.id } });
      } else {
        console.error('更新任務列表失敗');
      }
    } catch (error) {
      console.error('更新時發生錯誤:', error);
    }
  };

  return (
    <div  className="container">
      <h1>更新任務列表</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>標題:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>描述:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
            <button
                type="button"
                onClick={() => navigate('/TaskListDetail', { state: taskList })} // 改為返回 TaskListDetail
                className="button button-secondary"
            >
            上一頁
            </button>
        </div>

        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default UpdateTaskList;