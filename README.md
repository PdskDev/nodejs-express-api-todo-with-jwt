# Todo API with User Authentication

A RESTful API built with Express.js and MongoDB that provides todo management with user authentication and authorization.

## Features

- User authentication using JWT
- Role-based authorization (Admin/User)
- Todo CRUD operations
- User management (Admin only)
- API documentation with Swagger
- MongoDB integration
- Error handling
- Input validation

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/PdskDev/nodejs-express-api-todo-with-jwt.git
cd todo-api
``` 

### 2. Install dependencies:
```bash
npm install
``` 

### 3. Create a .env file in the root directory:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key_here
```
## Running the Application

###  Development mode:
```bash
npm run dev
``` 

### Production mode:
```bash
npm run start
``` 

The server will start on http://localhost:3000 (or the PORT specified in your .env file)

## API Documentation
Swagger documentation is available at: http://localhost:3000/api-docs

### Main Endpoints
#### Authentication
- POST /users/register - Register a new user

- POST /users/login - Login user

#### Users (Admin only)
- GET /users - Get all users

- POST /users - Create a new user

- PUT /users/:id - Update a user

- DELETE /users/:id - Delete a user

#### Todos
- GET /todos - Get all todos (Admin: all todos, User: own todos)

- POST /todos - Create a new todo

- GET /todos/:id - Get a specific todo

- PUT /todos/:id - Update a todo

- DELETE /todos/:id - Delete a todo

### Project Structure:

```bash
project/
├── controllers/
│   ├── todoController.js
│   └── userController.js
├── routes/
│   ├── todoRoutes.js
│   └── userRoutes.js
├── models/
│   ├── todo.js
│   └── user.js
├── middleware/
│   └── auth.js
├── swagger.js
├── index.js
└── .env
```

### Authentication
The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

- Get a token by logging in
- Include the token in the Authorization header:

Authorization: Bearer <your_token_here>

## Models
### User
- name: String (required)

- email: String (required, unique)

- password: String (required)

- role: String (enum: 'user', 'admin')

- isActive: Boolean

### Todo
- title: String (required)

- description: String (required)

- completed: Boolean

- user: Reference to User model

### Error Handling
The API includes comprehensive error handling for:

- Validation errors

- Authentication errors

- Authorization errors

- Not found errors

- Server errors

## Development
Available Scripts
- npm start - Run the application

- npm run dev - Run the application with nodemon for development

## Security Features
- Password hashing using bcryptjs

- JWT token authentication

- Role-based access control

- Request validation

- Protected routes

- Environment variables for sensitive data

## Contributing
- Fork the repository

- Create your feature branch ( git checkout -b feature/amazing-feature)

- Commit your changes ( git commit -m 'Add some amazing feature')

- Push to the branch ( git push origin feature/amazing-feature)

- Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Author
Nadet LAMBI-BIDZIMOU (NadetDev)

## Acknowledgments
- Express.js

- MongoDB

- Mongoose

- JWT

- Swagger UI