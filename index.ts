import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { getTransactions, storeTransaction } from "./monzo-transactions";

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
    console.log("Successfully entered the function!")
    console.log(event)

    if (event.httpMethod === 'POST') {
        console.log('New transaction received')

        await storeTransaction(JSON.parse(event.body))

        return { statusCode: 200 }
    } else if (event.httpMethod === 'GET') {
        try {
            const items = await getTransactions();

            return {
                statusCode: 200,
                body: JSON.stringify(items)
            }
        } catch (err) {
            return {
                statusCode: 400,
                body: JSON.stringify(err)
            }
        }
    }

    console.log(`${event.httpMethod} request received`)
    console.log('Doing nothing and exiting...')
    return {
        statusCode: 200,
        body: JSON.stringify({hello: "world"})
    };
}