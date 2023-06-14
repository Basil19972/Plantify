import { CreatePlantValues, PlantValues } from "../types/Plant.type";
import { databases } from "../auth/appwrite";
import { ID } from "appwrite";

// Retrieves all plants from the database
async function getPlants() {
  const promise = databases.listDocuments<PlantValues>(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID
  );
  return await promise;
}

// Deletes a watering entry by its ID
async function deleteWateringById(Id: string) {
  const promise = databases.deleteDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID,
    Id
  );
  return await promise;
}

// Creates a new watering entry
async function createWatering(plantOB: CreatePlantValues) {
  const promise = databases.createDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID,
    ID.unique(),
    plantOB
  );
  return await promise;
}

// Object containing plant service functions
const plantService = {
  getPlants,
  deleteWateringById,
  createWatering
};

export default plantService;
