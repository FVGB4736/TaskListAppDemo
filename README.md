# 任務管理系統 (Task Management Application)

一個使用 Spring Boot 和 React 構建的全端任務管理應用程式。

## 功能特點 (Features)

- Create, read, update, and delete tasks
- RESTful API backend with Spring Boot
- PostgreSQL database integration
- H2 in-memory database for testing
- React frontend with TypeScript
- Docker support for containerization

## 環境需求 (Prerequisites)

- Java 21
- Maven 3.6+
- Node.js 16+
- Docker (可選，但建議使用)

## 資料庫設定 (Database Configuration)

### 使用 Docker 啟動資料庫 (Recommended)

1. 確保已安裝 Docker 和 Docker Compose
2. 在專案根目錄執行以下指令啟動 PostgreSQL 容器：
   ```bash
   docker-compose up -d
   ```
3. 資料庫設定如下：
   - **Host**: localhost
   - **Port**: 5432
   - **Database**: practicedatabase
   - **Username**: user
   - **Password**: password

### 手動設定 PostgreSQL 資料庫

1. 安裝 PostgreSQL 13+
2. 建立資料庫和使用者：
   ```sql
   CREATE DATABASE practicedatabase;
   CREATE USER user WITH ENCRYPTED PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE practicedatabase TO user;
   ```
3. 更新 `src/main/resources/application.properties` 中的資料庫連線設定：

## Tech Stack

- **Backend**:
  - Spring Boot 3.5.4
  - Spring Data JPA
  - PostgreSQL
  - H2 Database (for testing)
  - Maven

- **Frontend**:
  - React
  - TypeScript

## 安裝與設定 (Setup Instructions)

### 後端設定 (Backend Setup)

1. Create a PostgreSQL database named `practicedatabase`
2. Update database credentials in `src/main/resources/application.properties` if needed
3. Build the project:
   ```bash
   mvn clean install
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### 前端設定 (Frontend Setup)

1. Navigate to the frontend directory:
   ```bash
   cd FirstFrontEndProjectForSpringBootApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Docker 容器化部署 (Docker Deployment)

1. 啟動 PostgreSQL 資料庫：
   ```bash
   docker-compose up -d postgres
   ```

2. 構建並啟動應用程式：
   ```bash
   # 構建應用程式
   mvn clean package
   
   # 啟動應用程式
   java -jar target/appDemo-0.0.1-SNAPSHOT.jar
   ```

3. 確認容器狀態：
   ```bash
   docker ps
   ```

4. 停止服務：
   ```bash
   docker-compose down
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Project Structure

```
appDemo/
├── src/                    # Backend source code
│   ├── main/
│   │   ├── java/com/practice/appdemo/
│   │   │   ├── controller/  # REST controllers
│   │   │   ├── model/       # Entity classes
│   │   │   ├── repository/  # Data access layer
│   │   │   └── service/     # Business logic
│   │   └── resources/       # Configuration files
│   └── test/               # Test files
├── FirstFrontEndProjectForSpringBootApp/  # Frontend React app
├── docker-compose.yml       # Docker configuration
└── pom.xml                 # Maven configuration
```

By FVGB4736
