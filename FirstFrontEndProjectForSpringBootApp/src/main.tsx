import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import CreateTaskList from './CreateTaskList.tsx';
import UpdateTaskList from './UpdateTaskList.tsx';
import TaskListDetail from './TaskListDetail.tsx';
import CreateTask from './CreateTask.tsx';
import TaskDetail from './TaskDetail.tsx';
import { Component, ReactNode } from 'react';

import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/CreateTaskList" element={<CreateTaskList />} />
            <Route path="/UpdateTaskList" element={<UpdateTaskList />} />
            <Route path="/TaskListDetail" element={<TaskListDetail />} />
            <Route path="/CreateTask" element={<CreateTask />} />
            <Route path="/TaskDetail" element={<TaskDetail />} />
          </Routes>
        </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);

//---------以上為原始檔案

//------------------------------------------------------------------------

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css';
// import App from './App.tsx';
// import Create from './CreateTaskList.tsx';
//
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/create" element={<CreateTaskList />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>,
// );