# Cleaning Management System

This project is a full-stack web application for managing cleaning services, built with React (frontend) and Node.js/Express (backend).

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Learn More](#learn-more)

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
  ├── middleware/
  ├── models/
  ├── routes/
  ├── server.js
  ├── package.json
  └── .env
```

- **Client/**: React frontend (UI, assets, styles)
- **Server/**: Node.js backend (API, authentication, database models)

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
MONGO_URI=mongodb://localhost:27017/cleaning-management
JWT_SECRET=your_jwt_secret
```

---

## Deployment

### Build the frontend

```sh
cd Client
npm run build
```

Deploy the contents of `Client/build` to your web server.

### Deploy the backend

Host the `Server` folder on your Node.js server (e.g., Heroku, Vercel, AWS).

---

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---


