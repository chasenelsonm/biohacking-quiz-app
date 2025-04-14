import { DynamoDBClient, CreateTableCommand, ScalarAttributeType, KeyType } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

// Configure AWS SDK with dummy credentials for LocalStack
const dynamoDBClient = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: "test", // Dummy access key
        secretAccessKey: "test" // Dummy secret key
    },
    endpoint: "http://localhost:4567" // LocalStack endpoint
});

const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

export { dynamoDB };

export const createQuizTable = async (): Promise<void> => {
    const params = {
        TableName: "Quizzes",
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" as KeyType }
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: ScalarAttributeType.S }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        await dynamoDBClient.send(new CreateTableCommand(params));
        console.log("Quiz table created successfully");
    } catch (error) {
        console.error("Error creating quiz table:", error);
    }
};

export const getAllQuizzes = async (): Promise<any[]> => {
    const params = {
        TableName: "Quizzes"
    };

    try {
        const data = await dynamoDB.send(new ScanCommand(params));
        return data.Items || [];
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        throw new Error("Could not fetch quizzes");
    }
};

export const getQuizById = async (id: string): Promise<any> => {
    const params = {
        TableName: "Quizzes",
        Key: { id }
    };

    try {
        const data = await dynamoDB.send(new GetCommand(params));
        return data.Item;
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw new Error("Could not fetch quiz");
    }
};

export const createQuiz = async (quiz: any): Promise<any> => {
    const params = {
        TableName: "Quizzes",
        Item: quiz
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        return quiz;
    } catch (error) {
        console.error("Error creating quiz:", error, "Params:", params);
        throw new Error("Could not create quiz");
    }
};

export const updateQuiz = async (id: string, updatedQuiz: any): Promise<any> => {
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
        await dynamoDB.send(new UpdateCommand(params));
        return { id, ...updatedQuiz };
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw new Error("Could not update quiz");
    }
};

export const deleteQuiz = async (id: string): Promise<any> => {
    const params = {
        TableName: "Quizzes",
        Key: { id }
    };

    try {
        await dynamoDB.send(new DeleteCommand(params));
        return { id };
    } catch (error) {
        console.error("Error deleting quiz:", error);
        throw new Error("Could not delete quiz");
    }
};