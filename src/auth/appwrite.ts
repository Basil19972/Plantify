import { Client, Account, Databases } from "appwrite";

const client = new Client();

export const account = new Account(client);
export const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6476e97c4b6b1579fdc3') // Your project ID
;