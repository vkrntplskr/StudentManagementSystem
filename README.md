# Student Management System

A full-stack web application for managing student records, built with .NET 8 and React.

## 🚀 Tech Stack

### Backend
* **.NET 8** (ASP.NET Core Web API)
* **Entity Framework Core** (SQL Server)
* **Swagger/OpenAPI** (API Documentation)

### Frontend
* **React 19**
* **Vite**
* **Bootstrap 5**
* **Axios**

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (Latest LTS recommended)
* SQL Server (LocalDB or a standard instance)

---

## 🛠️ Setup & Installation

### 1. Backend Setup

1.  Navigate to the backend project directory:
    ```bash
    cd Backend/StudentManagementSystem
    ```

2.  **Database Configuration**:
    The project uses the connection string `SMSConnection`. By default, it targets `(localdb)\MSSQLLocalDB`.
    * Check `appsettings.json` to modify the connection string if needed.

3.  **Apply Migrations**:
    Create the database and apply schema changes:
    ```bash
    dotnet ef database update
    ```

4.  **Run the API**:
    Start the backend server:
    ```bash
    dotnet run
    ```
    * The API will launch at `https://localhost:7077`.
    * Swagger UI is available at `https://localhost:7077/swagger`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd Frontend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configuration**:
    Ensure the API base URL matches your backend running port.
    * File: `src/api.js`
    * Default: `const API_BASE = 'https://localhost:7077/api/student';`

4.  **Run the Application**:
    Start the development server:
    ```bash
    npm run dev
    ```
    * The application will be accessible at `http://localhost:5173`.

---

## ⚙️ Configuration Notes

* **CORS Policy**: The backend is configured with a CORS policy named `"AllowReactApp"` that specifically allows requests from `http://localhost:5173`. If you change the frontend port, update `Program.cs` in the backend.
