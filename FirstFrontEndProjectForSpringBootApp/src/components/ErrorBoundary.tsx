// 引入 React 相關類型
import React, { Component, ReactNode } from 'react';

// 定義傳入 ErrorBoundary 的 props 介面（型別）
// children: 被這個元件包住的其他元件
interface ErrorBoundaryProps {
  children: ReactNode;
}

// 定義 ErrorBoundary 使用的 state 介面
interface ErrorBoundaryState {
  hasError: boolean; // 是否發生錯誤
  error: any;        // 錯誤的內容（可包含錯誤訊息、堆疊等）
}

// 使用 class component 定義錯誤邊界元件（因為錯誤邊界只能用 class 方式實作）
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 建構子：初始化 state
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // 初始狀態：沒有錯誤，錯誤內容為 null
    this.state = { hasError: false, error: null };
  }

  // React 的生命周期方法：當子元件發生錯誤時會自動被呼叫
  // 它會更新 state，觸發重新 render，顯示錯誤畫面
  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return {
      hasError: true, // 設定錯誤旗標為 true
      error: error     // 儲存錯誤內容
    };
  }

  // render 方法：根據是否發生錯誤決定要顯示什麼
  render() {
    // 如果有錯誤，顯示錯誤提示畫面
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          <h1>⚠️ 發生錯誤</h1>
          {/* 顯示錯誤訊息（若無則顯示「未知錯誤」） */}
          <p>{this.state.error?.message || '未知錯誤'}</p>
          {/* 提供重新整理按鈕讓使用者手動修復畫面 */}
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            重新載入頁面
          </button>
        </div>
      );
    }

    // 如果沒有錯誤，正常顯示子元件
    return this.props.children;
  }
}

// 匯出這個元件給其他檔案使用
export default ErrorBoundary;