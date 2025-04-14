import { Request, Response } from 'express';

// Define an interface for the quiz service
interface QuizService {
    getAllQuizzes(): Promise<any[]>;
    getQuizById(id: string): Promise<any>;
    createQuiz(quiz: any): Promise<any>;
    updateQuiz(id: string, updatedQuiz: any): Promise<any>;
    deleteQuiz(id: string): Promise<any>;
}

class QuizController {
    private quizService: QuizService; // Use the QuizService interface

    constructor(quizService: QuizService) {
        this.quizService = quizService;
    }

    async getQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const quizzes = await this.quizService.getAllQuizzes();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving quizzes', error });
        }
    }

    async getQuizById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const quiz = await this.quizService.getQuizById(id);
            if (quiz) {
                res.status(200).json(quiz);
            } else {
                res.status(404).json({ message: 'Quiz not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving quiz', error });
        }
    }

    async createQuiz(req: Request, res: Response): Promise<void> {
        const newQuiz = req.body;
        try {
            const createdQuiz = await this.quizService.createQuiz(newQuiz);
            res.status(201).json(createdQuiz);
        } catch (error) {
            res.status(500).json({ message: 'Error creating quiz', error });
        }
    }

    async updateQuiz(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedQuizData = req.body;
        try {
            const updatedQuiz = await this.quizService.updateQuiz(id, updatedQuizData);
            if (updatedQuiz) {
                res.status(200).json(updatedQuiz);
            } else {
                res.status(404).json({ message: 'Quiz not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating quiz', error });
        }
    }

    async deleteQuiz(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deleted = await this.quizService.deleteQuiz(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Quiz not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting quiz', error });
        }
    }
}

export default QuizController;