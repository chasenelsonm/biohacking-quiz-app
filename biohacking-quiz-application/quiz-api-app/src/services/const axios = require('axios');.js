const axios = require('axios');

const quiz = {
    id: "1",
    question: "What is the recommended duration of morning sunlight exposure?",
    options: ["10-15 minutes", "5 minutes", "30-45 minutes", "1 hour"],
    correctAnswer: "10-15 minutes"
};

axios.post('http://localhost:3000/api/quizzes', quiz, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Quiz created:', response.data);
})
.catch(error => {
    console.error('Error creating quiz:', error.response ? error.response.data : error.message);
});
