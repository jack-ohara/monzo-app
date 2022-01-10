import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
// import { getTransactions, storeTransaction } from "./monzo-transactions";

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    console.log("Successfully entered the function!")
    console.log(event)

    // if (event.requestContext.http.method === 'POST') {
    //     console.log('New transaction received')

    //     await storeTransaction(JSON.parse(event.body))

    //     return { statusCode: 200 }
    // } else if (event.requestContext.http.method === 'GET') {
    //     try {
    //         const items = await getTransactions();

    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify(items)
    //         }
    //     } catch (err) {
    //         return {
    //             statusCode: 400,
    //             body: JSON.stringify(err)
    //         }
    //     }
    // }

    // console.log(`${event.requestContext.http.method} request received`)
    // console.log('Doing nothing and exiting...')
    return {
        statusCode: 200
    };
}