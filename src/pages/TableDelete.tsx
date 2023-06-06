import { ActionIcon, Burger, Card, Group, Table, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconTrash } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlantValues } from "../types/Plant.type";
import feedBackModals from "../components/modals/FeedBackModals";
import plantService from "../services/plant.service";
import moment from "moment";

function TableBO() {
  const [plants, setplants] = useState<PlantValues[]>([]);
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    plantService.getPlants().then((res) => setplants(res.documents));
  }, []);

  const openConfirmDelete = (id: string) =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">Are you sure you want to delete this watering?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        plantService.deletePlantById(id).then((res) => {
          feedBackModals.SuccessModal({
            title: "Success",
            message: "Your watering is successfully deleted",
          });
          setplants(plants.filter((plant) => plant.$id !== id));
        });
      },
    });

  const rows = plants
    .slice(0)
    .reverse()
    .map((plant) => (
      <tr style={{ wordWrap: "break-word" }}>
        <td>{moment(plant.$createdAt).format("MMM Do YY")}</td>

        <td style={{ maxWidth: 60 }}>{plant.message}</td>
        <td>
          <ActionIcon
            onClick={() => {
              openConfirmDelete(plant.$id);
            }}
          >
            <IconTrash color="red"></IconTrash>
          </ActionIcon>
        </td>
      </tr>
    ));

  return (
    <>
      <Card
        w={"307px"}
        withBorder
        bg={"#222222"}
        p={20}
        c={"white"}
        radius={20}
      >
        <Group position="apart">
          <img src="images/logo.svg"></img>

          <Burger
            color="white"
            opened={opened}
            onClick={() => {
              setOpened((o) => !o);
              navigate("/");
            }}
          ></Burger>
        </Group>
        <Text size="xl" mt={10} mb={20}>
          Delete your waterings
        </Text>
        <Table c={"white"} verticalSpacing="md">
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    </>
  );
}

export default TableBO;
