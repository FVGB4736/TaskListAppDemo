import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 定義 TaskDto 介面，與後端對應
interface TaskDto {
  id?: string; // 可選，後端生成
  title: string;
  description: string;
  dueDate: string; // ISO 格式，例如 "2025-08-05"
  priority: string;
  status: string;
}

// 定義下拉清單選項介面
interface Option {
  value: string;
  label: string;
}

const CreateTask: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskListId } = location.state || {}; // 從 TaskListDetail 接收 taskListId

  const [task, setTask] = useState<TaskDto>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM', // 預設值
    status: 'OPEN', // 預設值
  });

  // 定義下拉選單數據狀態
    const [options, setOptions] = useState<{ priorities: Option[]; statuses: Option[] }>({
      priorities: [],
      statuses: [],
    });


// 從後端獲取下拉選單數據
  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const response = await fetch('/enums'); // 假設後端 API 端點
        if (response.ok) {
          const data = await response.json();
          setOptions(data); // 更新選項狀態
        } else {
          console.error('獲取枚舉失敗，狀態碼:', response.status, await response.text());
        }
      } catch (error) {
        console.error('獲取枚舉時發生錯誤:', error);
      }
    };
    fetchEnums();
  }, []); // 空依賴陣列，僅在組件掛載時執行

  // 處理表單輸入變化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // 格式化 dueDate 為 ISO 字符串
    const formattedTask = {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : '', // 轉為 "2025-08-09T12:00:00Z"
    };
    console.log('發送的 task 數據:', formattedTask); // 調試

    try {
      const response = await fetch(`/task-lists/${taskListId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedTask),
      });
      if (response.ok) {
        // 重新獲取 taskList 數據，並回傳至TaskListDetail頁面
          const updatedTaskListResponse = await fetch(`/task-lists/${taskListId}`);
          if (updatedTaskListResponse.ok) {
            const updatedTaskList = await updatedTaskListResponse.json();
            navigate('/TaskListDetail', { state: { taskList : updatedTaskList} });
          } else {
            console.error('獲取更新後的 taskList 失敗:', await updatedTaskListResponse.text());
            navigate('/TaskListDetail', { state: { taskListId : taskListId } }); // 失敗時僅傳 ID
          }
      } else {
        console.error('創建任務失敗，狀態碼:', response.status, await response.text());
      }
    } catch (error) {
      console.error('創建時發生錯誤:', error);
    }
  };

  return (
    <div className="container">
      <h1>創建新任務</h1>
      <form onSubmit={handleSubmit}>
        {/* 標題輸入 */}
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

        {/* 描述輸入 */}
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

        {/* 到期日期 */}
        <div className="mb-4">
          <label className="block">到期日期:</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 優先級選擇 */}
        <div className="mb-4">
          <label className="block">優先級:</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>請選擇優先級</option>
            {options.priorities.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 狀態選擇 */}
        <div className="mb-4">
          <label className="block">狀態:</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>請選擇狀態</option>
            {options.statuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          創建
        </button>
        <button
          type="button"
          className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => navigate('/TaskListDetail', { state: { taskListId } })}
        >
          取消
        </button>
      </form>
    </div>
  );
};

export default CreateTask;