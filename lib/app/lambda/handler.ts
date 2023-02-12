import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    let body = '';
    if (typeof event.body === "string") {

        body = JSON.parse(event.body) ;
        console.log(body);
    }

    // Parse the body contents

    const responseData = {
        success: true,
        message: 'Data received successfully',
        data: body
    };

    // Return a response
    return {
        statusCode: 200,
        body: JSON.stringify(responseData)
    };
}
