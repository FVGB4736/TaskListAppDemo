// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
//
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App


//---------以上為原始檔案

//------------------------------------------------------------------------
// 從 'react' 這個工具包裡引入三個東西：React 主程式、useState（管理資料用）、useEffect（處理副作用用）
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 導入 useNavigate

// 定義一個資料的「模板」（interface），告訴電腦 TaskListDto 這個東西長什麼樣子
interface TaskListDto {
  id: string;
  title: string;
  description: string;
  count: number;
  progress: number;
  tasks: any[]; // 根據實際 TaskDto 定義
}

// 定義一個叫 App 的組件，這是你的網頁主畫面
const App: React.FC = () => {
    // useState 是 React 的功能，用來存資料，這裡存了一個任務列表陣列，一開始是空的
  const [taskLists, setTaskLists] = useState<TaskListDto[]>([]);
  const navigate = useNavigate(); // 定義 navigate 函數

// useEffect 是 React 的功能，當網頁一開始載入時會執行裡面的程式碼
  useEffect(() => {
      // 定義一個函式去跟伺服器要資料
    const fetchTaskLists = async () => {
      try {
          // 用 fetch 去問伺服器要 "/task-lists" 的資料（就像寄信問東西）
        const response = await fetch('/task-lists');
        if (response.ok) {
            // 把回應轉成 JSON 格式
          const data = await response.json();
          // 用 setTaskLists 把資料存起來，這樣網頁會更新
          setTaskLists(data);
        } else {
          console.error('獲取任務列表失敗，狀態碼:', response.status, await response.text());
        }
      } catch (error) {
        console.error('獲取任務列表時發生錯誤:', error);
      }
    };
// 執行上面定義的函式
    fetchTaskLists();
  }, []);// 這裡的 [] 表示只在網頁第一次載入時跑一次

// 這裡是網頁的畫面，用 JSX 寫，看起來像 HTML，但其實是 JavaScript
  return (
    <div className="container">
      <h1>我的任務列表</h1>
      <button onClick={() => window.location.href = '/CreateTaskList'}>+ 新建任務列表</button>
      <ul>
        {taskLists.map((taskList) => (
          <li key={taskList.id}>
            <h2 className="clickable-title" onClick={() => navigate('/TaskListDetail', { state: {taskListId: taskList.id, taskList} })}>
              {taskList.title}
            </h2>
            <p>{taskList.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 把 App 這個組件輸出，讓其他檔案可以用
export default App;
