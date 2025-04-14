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
exports.deleteQuiz = exports.updateQuiz = exports.createQuiz = exports.getQuizById = exports.getAllQuizzes = exports.createQuizTable = exports.dynamoDB = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// Configure AWS SDK with dummy credentials for LocalStack
const dynamoDBClient = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test" // Dummy secret key
    },
    endpoint: "http://localhost:4567" // LocalStack endpoint
});
const dynamoDB = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoDBClient);
exports.dynamoDB = dynamoDB;
const createQuizTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Quizzes",
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" }
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: client_dynamodb_1.ScalarAttributeType.S }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };
    try {
        yield dynamoDBClient.send(new client_dynamodb_1.CreateTableCommand(params));
        console.log("Quiz table created successfully");
    }
    catch (error) {
        console.error("Error creating quiz table:", error);
    }
});
exports.createQuizTable = createQuizTable;
const getAllQuizzes = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Quizzes"
    };
    try {
        const data = yield dynamoDB.send(new lib_dynamodb_1.ScanCommand(params));
        return data.Items || [];
    }
    catch (error) {
        console.error("Error fetching quizzes:", error);
        throw new Error("Could not fetch quizzes");
    }
});
exports.getAllQuizzes = getAllQuizzes;
const getQuizById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Quizzes",
        Key: { id }
    };
    try {
        const data = yield dynamoDB.send(new lib_dynamodb_1.GetCommand(params));
        return data.Item;
    }
    catch (error) {
        console.error("Error fetching quiz:", error);
        throw new Error("Could not fetch quiz");
    }
});
exports.getQuizById = getQuizById;
const createQuiz = (quiz) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Quizzes",
        Item: quiz
    };
    try {
        yield dynamoDB.send(new lib_dynamodb_1.PutCommand(params));
        return quiz;
    }
    catch (error) {
        console.error("Error creating quiz:", error, "Params:", params);
        throw new Error("Could not create quiz");
    }
});
exports.createQuiz = createQuiz;
const updateQuiz = (id, updatedQuiz) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Quizzes",
        Key: { id },
        UpdateExpression: "set #q = :q, #o = :o, #ca = :ca",
        ExpressionAttributeNames: {
            "#q": "question",
            "#o": "options",
            "#ca": "correctAnswer"
        },
        ExpressionAttributeValues: {
            ":q": updatedQuiz.question,
            ":o": updatedQuiz.options,
            ":ca": updatedQuiz.correctAnswer
        }
    };
    try {
        yield dynamoDB.send(new lib_dynamodb_1.UpdateCommand(params));
        return Object.assign({ id }, updatedQuiz);
    }
    catch (error) {
        console.error("Error updating quiz:", error);
        throw new Error("Could not update quiz");
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "Quizzes",
        Key: { id }
    };
    try {
        yield dynamoDB.send(new lib_dynamodb_1.DeleteCommand(params));
        return { id };
    }
    catch (error) {
        console.error("Error deleting quiz:", error);
        throw new Error("Could not delete quiz");
    }
});
exports.deleteQuiz = deleteQuiz;
