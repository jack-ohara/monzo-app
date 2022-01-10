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
                        logo: monzoTransaction.data.merchant?.logo ? { S: monzoTransaction.data.merchant?.logo } : { NULL: true }
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

export async function getTransactions(): Promise<StoredTransaction[]> {
    console.log("Reading transactions from DB");

    const dbClient = new DynamoDB({ region: "eu-west-2" });

    try {
        const result = await dbClient.query({
            TableName: "monzo-transactions",
            ExpressionAttributeValues: { ":v1": { S: "Jack O'Hara" } },
            KeyConditionExpression: "account_holder_name = :v1"
        })

        console.log("Successfully queried items");

        return result.Items.map(i => {
            return {
                account_holder_name: i.account_holder_name.S,
                amount: parseInt(i.amount.N),
                currency: i.currency.S,
                description: i.description.S,
                transaction_date: i.transaction_date.S,
                transaction_recipient: {
                    name: i.transaction_recipient.M.name.S,
                    logo: i.transaction_recipient.M.logo.N ? undefined : i.transaction_recipient.M.logo.S
                }
            }
        });
    } catch (error) {
        console.error("Failed to query items")
        console.error(error);

        throw error;
    }
}