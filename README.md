# 🐾 Dalil Kalba — Tourist & News Guide for Kalba

Dalil Kalba is a **full-stack web project** designed to showcase **tourist attractions and local news in Kalba City (UAE)** in a modern and user-friendly way.  
The system includes a **public website (React)** and an **admin dashboard (ASP.NET Core Web API)** for managing posts, news, and media.

---

## 🧩 Project Structure

### 🖥️ Frontend — React (Vite)

- Built with **React + Vite** for blazing-fast performance.
- **lucide icons + CSS Modules** for design.
- Uses **API.js** to communicate securely with backend routes.

**Folder Structure:**

```
src/
├── api/
│   └── api.js
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Posts.jsx
│   ├── Social.jsx
│   ├── Map.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── PrivateRoute.jsx
│   └── common/
│       └── PostCard.jsx
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
├── styles/
│   ├── Header.css
│   ├── Hero.css
│   ├── Posts.css
│   ├── Dashboard.css
│   ├── Login.css
│   └── ...
├── App.jsx
└── App.css
```

### ⚙️ Backend — ASP.NET Core 8.0

- RESTful API with **JWT Authentication**
- **Entity Framework Core (Code First)**
- Stores images in `wwwroot/images` and deletes them automatically when removed.

**Folder Structure:**

```
DalilKalba/
├── Controllers/
│   ├── AdminController.cs
│   ├── PostsController.cs
│   └── NewsController.cs
├── Data/
│   └── DalilKalbaContext.cs
├── Models/
│   ├── Admin.cs
│   ├── Post.cs
│   ├── News.cs
│   ├── TokenResponse.cs
│   └── ViewModels/
│       ├── LoginViewModel.cs
│       └── ChangePasswordViewModel.cs
├── appsettings.json
├── Program.cs
└── DalilKalba.csproj
```

---

## 🌟 Main Features

✅ Responsive modern UI (React + MUI)  
✅ Admin authentication with **JWT**  
✅ Add / Edit / Delete posts and news  
✅ Image upload and management in `wwwroot/images`  
✅ Featured posts support  
✅ Secure RESTful API communication  
✅ Fully responsive and optimized for all devices

---

## 🧠 Tech Stack

**Frontend:** React, Vite, CSS Modules
**Backend:** ASP.NET Core 8, EF Core, SQL Server
**Database:** SQL Server
**Authentication:** JWT
**Deployment:** Vercel (Frontend) + Localhost (Backend)

---

## ⚙️ Setup & Installation

### 1️⃣ Backend Setup

```bash
cd BackEnd
dotnet restore
dotnet ef database update
dotnet run
```

Server runs on:  
➡️ http://localhost:5000  
➡️ https://localhost:5001

### 2️⃣ Frontend Setup

```bash
cd FrontEnd
npm install
npm run dev
```

Frontend runs on:  
➡️ http://localhost:5173

---

## 🔐 Default Admin Login

| Username | Password |
| -------- | -------- |
| admin    | 12345    |

---

## 📡 API Endpoints

| Endpoint                 | Method | Description                 |
| ------------------------ | ------ | --------------------------- |
| `/api/Admin/login`       | POST   | Admin login                 |
| `/api/Admin/create`      | POST   | Add new post (JWT required) |
| `/api/Admin/edit/{id}`   | PUT    | Edit post                   |
| `/api/Admin/delete/{id}` | DELETE | Delete post and image       |
| `/api/Posts`             | GET    | Get all posts               |
| `/api/News`              | GET    | Get all news                |
| `/api/News/create`       | POST   | Add new news                |

---

## 🖼️ Screenshots

### 🏠 Home Page

![Home Page Screenshot](./screenshots/home.png)

### 🔐 Login Page

![Login Screenshot](./screenshots/login.png)

### 🧭 Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

---

## 👩‍💻 Developer

**Esraa Soliman**  
🚀 Full Stack Developer (React + ASP.NET Core)  
📧 [esraasoliman386@gmail.com](mailto:esraasoliman386@gmail.com)  
🌐 [Portfolio](https://esraa-soliman.vercel.app)  
💼 [LinkedIn](https://www.linkedin.com/in/esraa-soliman-7b132a249)

---

## 🧾 License

This project is open-source for educational purposes only.  
© 2025 Esraa Soliman. All Rights Reserved.
