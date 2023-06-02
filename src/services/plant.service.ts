import {CreatePlantValues, PlantValues} from "../types/Plant.type";
import {databases} from "../auth/appwrite";
import { ID } from "appwrite";

 
 async function getPlants() {
      const promise = databases.listDocuments<PlantValues>('64772f933237895b47fe', '64772f99a7db1a8b3660');
      return await promise;
  }


 async function deletePlantById(Id: string) {
     const promise = databases.deleteDocument('64772f933237895b47fe', '64772f99a7db1a8b3660', Id);
     return await promise;
    }
 

    async function createPlant(plantOB: CreatePlantValues){
   const promise = databases.createDocument('64772f933237895b47fe', '64772f99a7db1a8b3660', ID.unique(), plantOB);
   return await promise;
    }


  const plantService = {
  getPlants,
  deletePlantById,
  createPlant
};

export default plantService;