import { Client, Account, Databases } from "appwrite";

const client = new Client();

export const account = new Account(client);
export const databases = new Databases(client);

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_FUNCTION_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID) // Your project ID
;