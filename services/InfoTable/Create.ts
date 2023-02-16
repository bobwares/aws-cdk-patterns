import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MissingFieldError, validateAsSpaceEntry } from './InputValidator'
import { generateRandomId, getEventBody } from '../Shared/Utils'

const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        body: "",
        statusCode: 200
    }
    try {
        const item = getEventBody(event);
        item.id = generateRandomId();
        validateAsSpaceEntry(item);
        await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }).promise()
        result.body = JSON.stringify(`${item.id}`)
    } catch (error) {
        if (error instanceof MissingFieldError) {
            result.statusCode = 403;
            result.body = error.message;
        } else {
            result.statusCode = 500;

        }
       console.log(error)// result.body = error.message;

    }


    return result

}

export { handler }