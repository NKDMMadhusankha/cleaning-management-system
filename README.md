# Cleaning Management System

This project is a full-stack web application for managing cleaning services, built with React (frontend) and Node.js/Express (backend).

**🚀 Live Demo: [https://cleaning-management-system-tau.vercel.app/](https://cleaning-management-system-tau.vercel.app/)**

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Learn More](#learn-more)
- [Setup Instructions](#setup-instructions)

---

## Project Structure


```
Client/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── Assets/
  │   ├── App.jsx
  │   ├── index.jsx
  │   └── ...
  ├── package.json
  └── ...
Server/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── scripts/
  ├── server.js
  ├── package.json
  └── .env
```


- **Client/**: React frontend (UI, assets, styles)
- **Server/**: Node.js backend (API, authentication, database models, controllers, scripts)

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB (if using a database)

---

## Installation

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd cleaning-management-system
```

### 2. Install dependencies

#### Client

```sh
cd Client
npm install
```

#### Server

```sh
cd ../Server
npm install
```

---

## Running the Project

### 1. Start the backend server

```sh
cd Server
npm start
```

By default, the server runs on [http://localhost:5000](http://localhost:5000).

### 2. Start the frontend React app

```sh
cd ../Client
npm start
```

The React app runs on [http://localhost:3000](http://localhost:3000) and proxies API requests to the backend.

---

## Available Scripts

### Client

- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm test` – Runs tests.
- `npm run eject` – Ejects configuration (advanced).

### Server

- `npm start` – Starts the Express server.

---

## Environment Variables


Create a `.env` file in the `Server/` folder for backend configuration. Example:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cleaning-management
JWT_SECRET=your_jwt_secret
```

---

## Deployment

### Live Application

The application is deployed and accessible at:
**[https://cleaning-management-system-tau.vercel.app/](https://cleaning-management-system-tau.vercel.app/)**

### Build the frontend

```sh
cd Client
npm run build
```

Deploy the contents of `Client/build` to your web server or hosting platform like Vercel.

### Deploy the backend

Host the `Server` folder on your Node.js server (e.g., Heroku, Vercel, AWS, Railway).

**Note:** The live demo is deployed on Vercel with both frontend and backend components.

---

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## Setup Instructions

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd cleaning-management-system
```

### 2. Install dependencies

#### Client

```sh
cd Client
npm install
```

#### Server

```sh
cd ../Server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `Server/` folder. Example:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cleaning-management
JWT_SECRET=your_jwt_secret
```


### 4. Create the admin user

Run the script to create the default admin user (make sure your `.env` file uses `MONGODB_URI`):

```sh
cd Server/scripts
node createAdmin.js
```

This will set up the admin account for the system. If you see a MongoDB URI error, ensure your `.env` file is in the `Server` folder and contains `MONGODB_URI`.

### 5. Start the backend server

```sh
cd Server
npm start
```


### 6. Start the frontend React app

```sh
cd ../Client
npm start
```
---

## Latest Updates

- Refactored backend to clean MVC structure (controllers, models, routes)
- Fixed booking and service CRUD routes and permissions
- Added admin and owner delete routes for bookings
- Added hard delete route for services
- Fixed environment variable usage for scripts (use `MONGODB_URI`)
- Improved error handling and frontend error messages
- Ensure `.env` is in `Server` and contains correct variables
- **Deployed application on Vercel at [https://cleaning-management-system-tau.vercel.app/](https://cleaning-management-system-tau.vercel.app/)**
- Made AdminPortal component fully mobile responsive


