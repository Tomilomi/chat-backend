# Tomilomi's chat-backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-blue)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-orange)](https://sequelize.org/)


This is the backend for a real-time chat application built with **Node.js**, **Express**, **Sequelize**, and **SQL Server**. It supports JWT authentication, image uploads with `multer`, and a layered architecture.

## Technologies Used

- Node.js + Express

- Sequelize (ORM)

- SQL Server

- JWT for authentication

- Bcrypt for password hashing

- Multer for file handling

- Dotenv for environment variables

## Features

- JWT authentication
- User registration and login
- Sending messages
- Image uploads (profile, messages, etc.)
- Layered architecture (models, repositories, services, routes)

---

## Project Structure

```bash
chat-react-backend/
├── app.js # Main entry point
├── data/
│ └── init.sql # Sql Query with my database tables
├── db/
│ └── db.js # Database configuration (Sequelize)
├── middlewares/
│ └── authMiddleware.js # JWT authentication middleware
├── models/ # Sequelize models
│ ├── message.js
│ ├── picture.js
│ └── user.js
├── repositories/ # Data access layer
│ ├── baseRepository.js
│ ├── imageRepository.js
│ ├── messageRepository.js
│ └── userRepository.js
├── routes/ # Express route definitions
│ ├── auth.routes.js
│ ├── chat.routes.js
│ ├── image.routes.js
│ └── user.routes.js
├── services/ # Business logic
│ ├── image.service.js
│ ├── message.service.js
│ └── user.service.js
├── package.json
└── README.md
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chat-react-backend.git
cd chat-react-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run in development mode
npm run dev
```
## Environment Variables

Make sure you have a .env file with the following values:
```bash
DB_USER=username
DB_PASSWORD=password
DB_NAME=database_name
DB_HOST=localhost
DB_PORT=1433
JWT_SECRET=supersecret
```

## To Be Implemented

- Additional security features (rate limiting, input sanitization, etc.)

- Real-time communication with Socket.IO

- Automated tests (unit/integration)