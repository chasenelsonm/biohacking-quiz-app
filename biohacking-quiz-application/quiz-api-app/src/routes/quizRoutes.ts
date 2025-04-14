import { Express } from 'express';
import { getAllQuizzes, createQuiz, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quizController';

export const setRoutes = (app: Express) => {
    // Adjust the paths if needed
    app.get('/quizzes', getAllQuizzes);
    app.post('/quizzes', createQuiz);
    app.get('/quizzes/:id', getQuizById);
    app.put('/quizzes/:id', updateQuiz);
    app.delete('/quizzes/:id', deleteQuiz);
};