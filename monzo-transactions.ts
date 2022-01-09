import { StoredTransaction, TransactionCreated } from "./types";
import { DynamoDB } from '@aws-sdk/client-dynamodb';

export async function storeTransaction(monzoTransaction: TransactionCreated): Promise<void> {
    const dbClient = new DynamoDB({ region: "eu-west-2" });

    try {
        const result = await dbClient.putItem({
            TableName: "monzo-transactions", Item: {
                account_holder_name: { S: "Jack O'Hara" },
                amount: { N: monzoTransaction.data.amount.toString() },
                currency: { S: monzoTransaction.data.currency },
                description: { S: monzoTransaction.data.description },
                transaction_date: { S: monzoTransaction.data.created },
                transaction_recipient: {
                    M: {
                        name: { S: monzoTransaction.data.merchant?.name ?? monzoTransaction.data.counterparty.preferred_name },
                        logo: monzoTransaction.data.merchant?.logo ? { S: monzoTransaction.data.merchant?.logo } : { NULL: Boolean(monzoTransaction.data.merchant?.logo) }
                    }
                }
            }
        });

        console.log("Successfully put transaction into DB");
        console.log(JSON.stringify(result));
        
    } catch (error) {
        console.error("Failed to put item")
        console.error(error);
    }
}