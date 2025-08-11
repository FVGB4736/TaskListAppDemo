import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 導入 useNavigate

const CreateTaskList: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // 定義 navigate 函數

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/task-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        window.location.href = '/'; // 提交成功後返回首頁，且刷新頁面
      } else {
        console.error('創建任務列表失敗');
      }
    } catch (error) {
      console.error('提交時發生錯誤:', error);
    }
  };

  return (
    <div  className="container">
      <h1>創建新任務列表</h1>
      <form onSubmit={handleSubmit}>
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
              onClick={() => navigate('/')}
              className="button button-secondary">
              上一頁
            </button>
        </div>

        <button type="submit">建立</button>
      </form>
    </div>
  );
};

export default CreateTaskList;