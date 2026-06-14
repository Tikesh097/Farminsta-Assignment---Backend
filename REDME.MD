# Project Management API

A simple REST API built with Node.js, Express, and MongoDB for managing users and projects with Authentication, Authorization, and Role-Based Access Control (RBAC).

## Features

* User Registration
* User Login
* JWT Authentication
* Access Token & Refresh Token Flow
* Role-Based Access Control (ADMIN, MANAGER, USER)
* Project CRUD Operations
* User Management for Admins
* Password Hashing using bcrypt
* MongoDB Integration with Mongoose
* Environment Variable Configuration
* Error Handling Middleware

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs

---

## Roles & Permissions

### USER

* View own profile
* Update own profile
* View projects

### MANAGER

* Everything USER can do
* Create projects
* Update own projects

### ADMIN

* Everything MANAGER can do
* Delete projects
* View all users
* Change user roles

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| POST   | /api/auth/refresh  |
| POST   | /api/auth/logout   |

### Projects

| Method | Endpoint          | Access               |
| ------ | ----------------- | -------------------- |
| GET    | /api/projects     | Authenticated Users  |
| POST   | /api/projects     | MANAGER, ADMIN       |
| PUT    | /api/projects/:id | Owner MANAGER, ADMIN |
| DELETE | /api/projects/:id | ADMIN                |

### Users

| Method | Endpoint            | Access |
| ------ | ------------------- | ------ |
| GET    | /api/users          | ADMIN  |
| PATCH  | /api/users/:id/role | ADMIN  |

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd project-management-api
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:8080
```

---

## Testing

Use Postman or any API client to test the endpoints.

Recommended flow:

1. Register a user
2. Login and get tokens
3. Create a project (Manager/Admin)
4. Update project
5. Refresh access token
6. Test role-based permissions

---

## Deployment

Live API:

```text
Add your deployment URL here
```

Example:

```text
https://project-management-api.onrender.com
```

---

## Project Structure

```text
src
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
├── app.js
└── server.js
```

---

## Author

Tikesh Aswale

This project was created as part of a backend assignment focused on authentication, authorization, RBAC, and secure API development.
