const axios = require('axios');

const testCreateQuiz = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/quizzes', {
      name: 'Sample Quiz',
      questions: [
        { question: 'What is 2 + 2?', options: ['3', '4'], answer: '4' }
      ]
    });
    console.log('Quiz created:', response.data);
  } catch (error) {
    console.error('Error creating quiz:', error.response?.data || error.message);
  }
};

testCreateQuiz();
