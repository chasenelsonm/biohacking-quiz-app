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
exports.createQuiz = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// Configure the DynamoDB client to point to your LocalStack instance.
const ddbClient = new client_dynamodb_1.DynamoDBClient({
    endpoint: process.env.AWS_ENDPOINT || "http://localhost:4566",
    region: process.env.AWS_REGION || "us-east-1"
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, questions } = req.body;
    // Create a unique id for the quiz (using timestamp - adjust as needed)
    const quizItem = {
        id: Date.now().toString(),
        title,
        description,
        questions
    };
    try {
        const params = {
            TableName: process.env.DYNAMO_TABLE || "Quizzes",
            Item: quizItem
        };
        yield ddbDocClient.send(new lib_dynamodb_1.PutCommand(params));
        res.status(201).json(quizItem);
    }
    catch (error) {
        console.error('Error creating quiz:', error); // Log the full error
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error creating quiz', error: errorMessage });
    }
});
exports.createQuiz = createQuiz;
