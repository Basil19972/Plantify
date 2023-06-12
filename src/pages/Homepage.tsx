import TableBO from "../components/TableBO";
import { useEffect, useState } from "react";
import { PlantValues } from "../types/Plant.type";
import { UserValues } from "../types/User.type";
import CreatePlant from "../components/CreatePlant";
import userService from "../services/user.service";
import plantService from "../services/plant.service";

function Hompage() {
  const [plants, setplants] = useState<PlantValues[]>([]);
  const [user, setuser] = useState<UserValues>();

  async function getPlantsList() {
    await plantService
      .getPlants()
      .then((res) => setplants(res.documents))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPlantsList();
    userService.getCurrentUser().then((res) => {
      setuser(res);
    });
  }, []);

  return (
    <>
      {user && <CreatePlant currentUser={user} getPlants={getPlantsList} />}
      <TableBO plants={plants} />
    </>
  );
}
export default Hompage;
