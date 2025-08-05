import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME!;

export const handler: APIGatewayProxyHandler = async (event) => {
  const method = event.httpMethod;
  const path = event.path;
  const id = event.pathParameters?.id;

  try {
    if (method === 'POST' && path === '/notes') {
      const body = JSON.parse(event.body || '{}');
      const note = {
        id: uuidv4(),
        title: body.title,
        content: body.content,
        createdAt: new Date().toISOString(),
      };
      await client.send(new PutCommand({ TableName: TABLE_NAME, Item: note }));
      return {
        statusCode: 201,
        body: JSON.stringify(note),
      };
    }

    if (method === 'GET' && path === '/notes') {
      const result = await client.send(new ScanCommand({ TableName: TABLE_NAME }));
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    }

    if (method === 'GET' && path.startsWith('/notes/') && id) {
      const result = await client.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }));
      if (!result.Item) {
        return { statusCode: 404, body: 'Note not found' };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    }

    if (method === 'DELETE' && path.startsWith('/notes/') && id) {
      await client.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }));
      return {
        statusCode: 204,
        body: '',
      };
    }

    return { statusCode: 400, body: 'Unsupported route' };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (err as any).message }),
    };
  }
};
