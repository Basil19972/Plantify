import {CreatePlantValues, PlantValues} from "../types/Plant.type";
import {databases} from "../auth/appwrite";
import { ID } from "appwrite";




 async function getPlants() {
      const promise = databases.listDocuments<PlantValues>(
        import.meta.env.VITE_DATABASE_ID, 
        import.meta.env.VITE_COLLECTION_ID);
      return await promise;
  }


 async function deletePlantById(Id: string) {
     const promise = databases.deleteDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, Id);
     return await promise;
    }
 

    async function createPlant(plantOB: CreatePlantValues){
   const promise = databases.createDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, ID.unique(), plantOB);
   return await promise;
    }


  const plantService = {
  getPlants,
  deletePlantById,
  createPlant
};

export default plantService;