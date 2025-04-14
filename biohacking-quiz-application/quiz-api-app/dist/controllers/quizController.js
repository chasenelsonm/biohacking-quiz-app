"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    getQuizzes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getQuizzes handler invoked'); // newly added log
            try {
                const quizzes = yield this.quizService.getAllQuizzes();
                res.status(200).json(quizzes);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving quizzes', error });
            }
        });
    }
    getQuizById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`getQuizById handler invoked for id: ${req.params.id}`); // newly added log
            const { id } = req.params;
            try {
                const quiz = yield this.quizService.getQuizById(id);
                if (quiz) {
                    res.status(200).json(quiz);
                }
                else {
                    res.status(404).json({ message: 'Quiz not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving quiz', error });
            }
        });
    }
    createQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('createQuiz handler invoked with body:', req.body); // newly added log
            const newQuiz = req.body;
            try {
                const createdQuiz = yield this.quizService.createQuiz(newQuiz);
                res.status(201).json(createdQuiz);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating quiz', error });
            }
        });
    }
    updateQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`updateQuiz handler invoked for id: ${req.params.id}`); // newly added log
            const { id } = req.params;
            const updatedQuizData = req.body;
            try {
                const updatedQuiz = yield this.quizService.updateQuiz(id, updatedQuizData);
                if (updatedQuiz) {
                    res.status(200).json(updatedQuiz);
                }
                else {
                    res.status(404).json({ message: 'Quiz not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating quiz', error });
            }
        });
    }
    deleteQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`deleteQuiz handler invoked for id: ${req.params.id}`); // newly added log
            const { id } = req.params;
            try {
                const deleted = yield this.quizService.deleteQuiz(id);
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: 'Quiz not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting quiz', error });
            }
        });
    }
}
exports.default = QuizController;
