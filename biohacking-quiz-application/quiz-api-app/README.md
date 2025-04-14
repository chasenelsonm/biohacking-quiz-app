# Quiz API Application

## Overview
The Quiz API is a RESTful application that allows users to create, retrieve, update, and delete quizzes. It uses LocalStack to simulate AWS DynamoDB for local development and testing. This project demonstrates the integration of Node.js, Express, and AWS services in a local environment.

## Features
- **GET /api/quizzes**: Retrieve all quizzes.
- **POST /api/quizzes**: Create a new quiz.
- **PUT /api/quizzes/{id}**: Update an existing quiz.
- **DELETE /api/quizzes/{id}**: Delete a quiz.

## Prerequisites
- Node.js installed on your system.
- Docker and Docker Compose installed for running LocalStack.

## Project Structure

```
quiz-api-app
├── src
│   ├── controllers
│   │   └── quizController.ts
│   ├── routes
│   │   └── quizRoutes.ts
│   ├── models
│   │   └── quiz.ts
│   ├── services
│   │   └── localstackService.ts
│   └── index.ts
├── test
│   └── quiz.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository or download the project files.
2. Navigate to the `quiz-api-app` directory:
   ```bash
   cd biohacking-quiz-application/quiz-api-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start LocalStack using Docker Compose:
   ```bash
   docker-compose up
   ```
5. Start the application:
   ```bash
   npm start
   ```
6. The API will be running at `http://localhost:3000`.

## API Endpoints
### 1. Retrieve All Quizzes
- **Endpoint**: `GET /api/quizzes`
- **Description**: Fetch all quizzes from the database.
- **Example**:
  ```bash
  curl http://localhost:3000/api/quizzes
  ```

### 2. Create a New Quiz
- **Endpoint**: `POST /api/quizzes`
- **Description**: Add a new quiz to the database.
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "id": "1",
    "question": "What is the recommended duration of morning sunlight exposure?",
    "options": ["10-15 minutes", "5 minutes", "30-45 minutes", "1 hour"],
    "correctAnswer": "10-15 minutes"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/quizzes -H "Content-Type: application/json" -d '{"id": "1", "question": "What is the recommended duration of morning sunlight exposure?", "options": ["10-15 minutes", "5 minutes", "30-45 minutes", "1 hour"], "correctAnswer": "10-15 minutes"}'
  ```

### 3. Update a Quiz
- **Endpoint**: `PUT /api/quizzes/{id}`
- **Description**: Update an existing quiz.
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "question": "Updated question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A"
  }
  ```
- **Example**:
  ```bash
  curl -X PUT http://localhost:3000/api/quizzes/1 -H "Content-Type: application/json" -d '{"question": "Updated question?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctAnswer": "Option A"}'
  ```

### 4. Delete a Quiz
- **Endpoint**: `DELETE /api/quizzes/{id}`
- **Description**: Remove a quiz from the database.
- **Example**:
  ```bash
  curl -X DELETE http://localhost:3000/api/quizzes/1
  ```

## Running the Application

### Using npm (Manual Management)
You can run the application with a prestart script that automatically kills any process using port `3000`:

1. **Open a terminal as Administrator** (so that the prestart script has the necessary permissions).
2. Navigate to the project directory:
   ```bash
   cd biohacking-quiz-application/quiz-api-app
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Process Management with Docker

We now use Docker instead of pm2 for process management. To run the Quiz API application using Docker, use the following commands:

To start the application:
```bash
docker-compose up --build
```

To stop the application:
```bash
docker-compose down
```

### Additional Notes

- **Environment Variables**:  
  Make sure your `.env` file is configured correctly (e.g., `PORT=3000` by default).

- **Graceful Shutdown**:  
  The application is configured to handle termination signals (`SIGINT`, `SIGTERM`) to release the port properly when stopped.

- **Troubleshooting Port Conflicts**:  
  If you encounter the `EADDRINUSE` error, ensure no leftover processes are running. Using pm2 helps mitigate this issue.

## Testing
- Use Postman or curl to test the API endpoints.
- Ensure LocalStack is running before testing.

## Notes
- This project uses LocalStack to simulate AWS DynamoDB. Ensure Docker is running and LocalStack is started using `docker-compose up`.
- The application is configured to run on `http://localhost:3000` by default.

## License
This project is licensed under the MIT License.