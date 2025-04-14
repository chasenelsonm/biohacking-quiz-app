import { Request, Response } from 'express';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Configure the DynamoDB client to point to your LocalStack instance.
const ddbClient = new DynamoDBClient({
  endpoint: process.env.AWS_ENDPOINT || "http://localhost:4566", // Default LocalStack endpoint for DynamoDB
  region: process.env.AWS_REGION || "us-east-1"
});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const createQuiz = async (req: Request, res: Response) => {
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

    await ddbDocClient.send(new PutCommand(params));
    res.status(201).json(quizItem);
  } catch (error) {
    console.error('Error creating quiz:', error); // Log the full error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error creating quiz', error: errorMessage });
  }
};