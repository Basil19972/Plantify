import TableBO from "../components/WateringTable";
import { useEffect, useState } from "react";
import { PlantValues } from "../types/Plant.type";
import { UserValues } from "../types/User.type";
import CreatePlant from "../components/CreatePlant";
import userService from "../services/user.service";
import plantService from "../services/plant.service";
import { Loader } from "@mantine/core";

function Homepage() {
  // State variables for plants, user and loading
  const [loading, setIsloading] = useState(true);
  const [plants, setPlants] = useState<PlantValues[]>([]);
  const [user, setUser] = useState<UserValues>();

  // Function to get the list of plants
  async function getPlantsList() {
    try {
      const res = await plantService.getPlants();
      setPlants(res.documents);
    } catch (err) {
      console.log(err);
    }
    setIsloading(false);
  }

  useEffect(() => {
    // Initialization: Get the list of plants and fetch user information
    getPlantsList();
    userService
      .getCurrentUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <Loader color="lime" size="xl" variant="bars" mt={400} />;

  return (
    <>
      {/* Component for creating a new plant */}
      {user && <CreatePlant currentUser={user} getPlants={getPlantsList} />}

      {/* Component for displaying the plant table */}
      <TableBO plants={plants} />
    </>
  );
}

export default Homepage;
