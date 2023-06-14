// Importing required dependencies and components
import { ActionIcon, Card, Container, Group, Table, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { PlantValues } from "../types/Plant.type";
import moment from "moment";
import { openModal } from "@mantine/modals";

function WateringTable({ plants }: { plants: PlantValues[] }) {
  // Function to open the explanation modal
  const openExplanationModal = () =>
    openModal({
      styles: {
        modal: {
          backgroundColor: "#222222",
          borderRadius: "10px",
          border: "solid",
          borderColor: "white",
          borderWidth: "2px",
          color: "white",
        },
      },
      title: "Information",
      children: (
        <>
          <Container>
            <Group position="center">
              <Text size="sm">
                Your waterings are stored for 6 months and then deleted{" "}
              </Text>
            </Group>
          </Container>
        </>
      ),
    });

  // Creating table rows based on the plant data
  const rows = plants
    .slice(0)
    .reverse()
    .map((plant) => (
      <tr key={plant.$id} style={{ wordWrap: "break-word" }}>
        <td>{plant.watered ? <img src="images/droplet.svg"></img> : ""}</td>
        <td>{plant.fertilized ? <img src="images/bolt.svg"></img> : ""}</td>

        <td>{moment(plant.$createdAt).format("MMM Do YY")}</td>

        <td style={{ maxWidth: 70 }}>{plant.message}</td>
      </tr>
    ));

  return (
    <>
      <Card withBorder bg={"#222222"} p={10} radius={20} mt={20} c={"white"}>
        <Container mt={15} mb={15}>
          <Group position="center">
            <Text size="xl">Your waterings</Text>

            {/* Button to open the explanation modal */}
            <ActionIcon
              size={20}
              color="green"
              variant="outline"
              onClick={() => {
                openExplanationModal();
              }}
            >
              <IconInfoCircle size={15} />
            </ActionIcon>
          </Group>
        </Container>

        <Table c={"white"} verticalSpacing="md">
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    </>
  );
}

export default WateringTable;
