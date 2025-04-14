import request from 'supertest';
import { app } from '../src/index'; // Assuming the Express app is exported from index.ts
import { Quiz } from '../src/models/quiz';

describe('Quiz API', () => {
    let quizId: string;

    beforeAll(async () => {
        // Setup code to create a quiz for testing
        const newQuiz = {
            question: 'What is the recommended duration of morning sunlight exposure?',
            options: ['10–15 minutes', '5 minutes', '30–45 minutes', '1 hour'],
            correctAnswer: '10–15 minutes'
        };

        const response = await request(app).post('/quizzes').send(newQuiz);
        quizId = response.body.id; // Assuming the response contains the created quiz ID
    });

    afterAll(async () => {
        // Cleanup code to delete the quiz after tests
        await request(app).delete(`/quizzes/${quizId}`);
    });

    it('should retrieve all quizzes', async () => {
        const response = await request(app).get('/quizzes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a quiz by ID', async () => {
        const response = await request(app).get(`/quizzes/${quizId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(quizId);
    });

    it('should create a new quiz', async () => {
        const newQuiz = {
            question: 'What is the key benefit of cold exposure?',
            options: ['Improves mood', 'Eliminates sleep', 'Accelerates metabolism', 'Replaces exercise'],
            correctAnswer: 'Improves mood'
        };

        const response = await request(app).post('/quizzes').send(newQuiz);
        expect(response.status).toBe(201);
        expect(response.body.question).toBe(newQuiz.question);
    });

    it('should update an existing quiz', async () => {
        const updatedQuiz = {
            question: 'Updated question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 'Option 1'
        };

        const response = await request(app).put(`/quizzes/${quizId}`).send(updatedQuiz);
        expect(response.status).toBe(200);
        expect(response.body.question).toBe(updatedQuiz.question);
    });

    it('should delete a quiz', async () => {
        const response = await request(app).delete(`/quizzes/${quizId}`);
        expect(response.status).toBe(204);
    });
});