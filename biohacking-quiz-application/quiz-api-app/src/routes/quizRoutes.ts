import { Router } from 'express';
import QuizController from '../controllers/quizController';
import * as quizService from '../services/localstackService'; // Import the quiz service

const router = Router();
const quizController = new QuizController(quizService); // Pass the quizService to the constructor

export function setRoutes(app: import('express').Application) { // Explicitly type the app parameter
    app.use('/api/quizzes', router);

    router.get('/', quizController.getQuizzes.bind(quizController));
    router.get('/:id', quizController.getQuizById.bind(quizController));
    router.post('/', quizController.createQuiz.bind(quizController));
    router.put('/:id', quizController.updateQuiz.bind(quizController));
    router.delete('/:id', quizController.deleteQuiz.bind(quizController));
}