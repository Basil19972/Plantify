// Importing required dependencies from the "appwrite" package
import { Client, Account, Databases } from "appwrite";

// Creating a new instance of the Appwrite client
const client = new Client();

// Creating instances of the Account and Databases classes using the client
export const account = new Account(client);
export const databases = new Databases(client);

// Configuring the client with the endpoint and project ID
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_FUNCTION_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID);
