# Student Management System

A robust full-stack web application designed to perform Create, Read, Update, and Delete (CRUD) operations on student records. This project demonstrates a modern architecture using a decoupled **.NET 8 Web API** backend and a **React 19** frontend.

---

## 📑 Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [Cloning the Repository](#1-cloning-the-repository)
  - [Backend Setup](#2-backend-setup-net-api)
  - [Frontend Setup](#3-frontend-setup-react)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting & Common Problems](#-troubleshooting--common-problems)

---

## 🚀 Tech Stack

### **Backend**
* **Framework**: .NET 8 (ASP.NET Core Web API)
* **Database**: SQL Server (via Entity Framework Core)
* **ORM**: Entity Framework Core (Code-First approach)
* **Documentation**: Swagger / OpenAPI
* **Architecture**: Controller-Service pattern (implied)

### **Frontend**
* **Framework**: React 19
* **Build Tool**: Vite
* **Styling**: Bootstrap 5
* **HTTP Client**: Axios
* **Routing**: React Router DOM

---

## 📂 Project Structure

```text
studentmanagementsystem/
├── Backend/
│   └── StudentManagementSystem/
│       ├── Controllers/       # API Controllers (e.g., StudentController.cs)
│       ├── Models/            # EF Core Models (Student.cs, StudentDBContext.cs)
│       ├── Migrations/        # Database migration files
│       ├── appsettings.json   # Database connection strings & config
│       └── Program.cs         # App entry point, DI, and CORS config
├── Frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, etc.)
│   │   ├── pages/             # Page views (StudentList, AddStudent, etc.)
│   │   ├── api.js             # Centralized Axios API calls
│   │   └── App.jsx            # Main React component
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
└── README.md
````

-----

## 📋 Prerequisites

Ensure you have the following installed on your machine before starting:

1.  **[.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** - Required to build and run the backend.
2.  **[Node.js](https://nodejs.org/)** (v18+ recommended) - Required for the React frontend.
3.  **[SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)** - You can use the full version, SQL Express, or **LocalDB** (installed with Visual Studio).
4.  **Git** - For cloning the repository.

-----

## 🛠 Installation & Setup

### 1\. Cloning the Repository

Open your terminal and run:

```bash
git clone [https://github.com/vkrntplskr/studentmanagementsystem.git](https://github.com/vkrntplskr/studentmanagementsystem.git)
cd studentmanagementsystem
```

### 2\. Backend Setup (.NET API)

The backend manages the data and business logic.

1.  **Navigate to the backend folder:**

    ```bash
    cd Backend/StudentManagementSystem
    ```

2.  **Configure the Database:**
    Open `appsettings.json`. The default connection string targets `(localdb)\MSSQLLocalDB`.

    ```json
    "ConnectionStrings": {
      "SMSConnection": "Server=(localdb)\\MSSQLLocalDB;Database=StudentDB;Trusted_Connection=True;MultipleActiveResultSets=true"
    }
    ```

      * *Note:* If you are using SQL Express, change `Server=(localdb)\MSSQLLocalDB` to `Server=.\SQLEXPRESS`.

3.  **Restore Dependencies & Update Database:**
    Run the following commands to install packages and create the database schema:

    ```bash
    dotnet restore
    dotnet ef database update
    ```

4.  **Run the Server:**

    ```bash
    dotnet run
    ```

      * **Success:** The terminal will indicate the server is listening, typically on `https://localhost:7077`.
      * **Swagger:** You can view the API documentation at `https://localhost:7077/swagger`.

### 3\. Frontend Setup (React)

The frontend provides the user interface.

1.  **Open a new terminal** (keep the backend running) and navigate to the frontend:

    ```bash
    cd Frontend
    ```

2.  **Install Node Packages:**

    ```bash
    npm install
    ```

3.  **Verify API Configuration:**
    Open `src/api.js` and check `API_BASE`. It **must** match the URL your backend is running on.

    ```javascript
    // src/api.js
    const API_BASE = 'https://localhost:7077/api/student'; 
    ```

4.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

      * The app will start at `http://localhost:5173`.

-----

## 🔌 API Endpoints

Based on the standard setup, the API exposes the following endpoints at `/api/student`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/student` | Retrieve all students |
| **GET** | `/api/student/{id}` | Retrieve a single student by ID |
| **POST** | `/api/student` | Create a new student record |
| **PUT** | `/api/student/{id}` | Update an existing student |
| **DELETE** | `/api/student/{id}` | Delete a student record |

-----

## ❓ Troubleshooting & Common Problems

### 1\. CORS Error (Cross-Origin Resource Sharing)

  * **Problem:** The browser console shows a red error saying "Access to XMLHttpRequest has been blocked by CORS policy."
  * **Cause:** The backend typically runs on port `7077` and the frontend on `5173`. Browsers block this by default unless the backend explicitly allows it.
  * **Solution:**
    1.  Check `Program.cs` in the backend.
    2.  Ensure the `WithOrigins` URL exactly matches your frontend URL.
    <!-- end list -->
    ```csharp
    options.AddPolicy("AllowReactApp", policy => policy
        .WithOrigins("http://localhost:5173") // Must match your React port
        .AllowAnyMethod()
        .AllowAnyHeader());
    ```
    3.  If Vite starts on a different port (e.g., `5174`), update this line and restart the backend.

### 2\. Database Connection Failed

  * **Problem:** Error creating database or "A network-related or instance-specific error occurred."
  * **Cause:** The connection string in `appsettings.json` is incorrect for your SQL Server instance.
  * **Solution:**
      * If using **Visual Studio**, keep `(localdb)\MSSQLLocalDB`.
      * If using **SQL Server Management Studio (SSMS)** default instance, try `Server=.` or `Server=localhost`.
      * If using **SQL Express**, use `Server=.\SQLEXPRESS`.

### 3\. API Port Mismatch

  * **Problem:** The frontend loads, but no data appears, or requests fail with `ERR_CONNECTION_REFUSED`.
  * **Cause:** The backend might be running on a different port (e.g., `5000` or `http` instead of `https`) than what is hardcoded in the frontend.
  * **Solution:**
    1.  Check the terminal output of `dotnet run` to see the actual listening address (e.g., `Now listening on: https://localhost:7077`).
    2.  Update `src/api.js` to match that exact URL.

### 4\. SSL / HTTPS Certificate Errors

  * **Problem:** Browser warns "Your connection is not private" when accessing the API.
  * **Cause:** The development SSL certificate is not trusted.
  * **Solution:**
      * Run `dotnet dev-certs https --trust` in your terminal to trust the development certificate.
      * Alternatively, click "Advanced" -\> "Proceed to localhost (unsafe)" in the browser.

<!-- end list -->

```
```
