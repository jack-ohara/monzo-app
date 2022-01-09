import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDB } from '@aws-sdk/client-dynamodb'

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    console.log(event)

    if (event.requestContext.http.method === 'POST') {
        console.log('POST request received')
        console.log(event.body)

        return {
            statusCode: 200,
            body: JSON.stringify("Thanks for the tasty data")
        }
    } else if (event.requestContext.http.method === 'GET') {
        const dbClient = new DynamoDB({ region: "eu-west-2" })

        try {
            const tableInfo = await dbClient.describeTable({ TableName: "monzo-transactions" });

            return {
                statusCode: 200,
                body: JSON.stringify(tableInfo, null, 2)
            }
        } catch (err) {
            console.error("Failed to read from the DB!")
            console.error(err);

            return {
                statusCode: 400
            }
        }
    }

    console.log(`${event.requestContext.http.method} request received`)
    console.log('Doing nothing and exiting...')
    return {
        statusCode: 405
    };
}