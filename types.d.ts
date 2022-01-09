import { AttributeValue } from "aws-lambda";

export type TransactionCreated = {
    data: {
        account_id: string;
        amount: number;
        created: string;
        currency: string;
        description: string;
        id: string;
        category: string;
        is_load: boolean;
        settled: string;
        merchant: Merchant | null;
        counterparty: Counterparty | null;
    }
};

type Merchant = {
    address: Address;
    created: string;
    group_id: string;
    id: string;
    logo: string;
    emoji: string;
    name: string;
    category: string;
};

type Address = {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    postcode: string;
    region: string;
};

type Counterparty = {
    account_id: string;
    name: string;
    preferred_name: string;
    user_id: string;
};

export type StoredTransaction = {
    account_holder_name: AttributeValue;
    transaction_date: AttributeValue;
    transaction_recipient: AttributeValue; // {name: string; logo: string}
    amount: AttributeValue;
    currency: AttributeValue;
    description: AttributeValue;
}