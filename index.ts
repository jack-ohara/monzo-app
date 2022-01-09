import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    console.log(event)

    if (event.requestContext.http.method === 'POST') {
        console.log('POST request received')
        console.log(event.body)

        return {
            statusCode: 200,
            body: JSON.stringify("Thanks for the tasty data")
        }
    }

    console.log(`${event.requestContext.http.method} request received`)
    console.log('Doing nothing and exiting...')
    return {
        statusCode: 405
    };
}