package com.practice.appDemo.controller;

import com.practice.appDemo.domain.dtos.ErrorResponse; // 自定義的錯誤回應 DTO
import org.springframework.http.HttpStatus; // HTTP 狀態碼類
import org.springframework.http.ResponseEntity; // 用於封裝回應的類
import org.springframework.web.bind.annotation.ControllerAdvice; // 全局異常處理注解
import org.springframework.web.bind.annotation.ExceptionHandler; // 異常處理方法注解
import org.springframework.web.context.request.WebRequest; // 提供請求上下文資訊

/**
 * 全局異常處理器，用於捕獲應用程式中的所有異常並返回標準化的錯誤回應。
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 處理 IllegalAccessError 的異常。
     * @param ex 拋出的異常物件，包含異常訊息
     * @param request WebRequest 物件，提供請求相關資訊
     * @return ResponseEntity 封裝了錯誤回應和 HTTP 狀態碼
     */
    @ExceptionHandler({IllegalAccessError.class})
    public ResponseEntity<ErrorResponse> handleExceptions(RuntimeException ex, WebRequest request) {
        // 創建 ErrorResponse 物件，包含狀態碼、錯誤訊息和請求描述
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(), // 取得 HTTP 400 狀態碼的值 (400)
                ex.getMessage(), // 從異常中獲取錯誤訊息
                request.getDescription(false) // 獲取請求的描述（不包含堆疊追蹤）
        );
        // 回傳 ResponseEntity，設定錯誤回應和 HTTP 狀態碼 400
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
