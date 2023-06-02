import { Models } from "appwrite";

export type PlantValues = {
    date: string;
    watered: boolean;
    fertilized: boolean;
    message: string;
  } & Models.Document;


  export type CreatePlantValues = {
    userId: string;
    watered: boolean;
    fertilized: boolean;
    message: string;
  }
