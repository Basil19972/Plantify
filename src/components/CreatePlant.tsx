import {
  Box,
  Burger,
  Button,
  Card,
  Center,
  Checkbox,
  CheckboxProps,
  Container,
  Divider,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { IconDroplet, IconBolt } from "@tabler/icons";
import { useState } from "react";
import { openConfirmModal, openModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import feedBackModals from "../components/modals/FeedBackModals";
import plantService from "../services/plant.service";
import { UserValues } from "../types/User.type";

function CreatePlant({
  currentUser,
  getPlants,
}: {
  currentUser: UserValues;
  getPlants: () => void;
}) {
  const [watered, setwatered] = useState(true);
  const [fertilized, setfertilized] = useState<boolean>(false);
  const [message, setmessage] = useState("");
  const [opened, setOpened] = useState(false);

  const CheckboxIcon1: CheckboxProps["icon"] = ({ className }) => (
    <IconBolt className={className} color={"yellow"} />
  );

  const CheckboxIcon: CheckboxProps["icon"] = ({ className }) => (
    <IconDroplet className={className} color={"blue"} />
  );
  const navigate = useNavigate();

  const plantOB = {
    userId: currentUser.$id,
    watered: watered,
    fertilized: fertilized,
    message: message,
  };

  const handleChangeMessage = (event: any) => {
    setmessage(event.target.value);
  };

  const handleChangeFertilized = (event: any) => {
    setfertilized((prevState) => !prevState);
  };

  const openConfirmModa = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">Are you sure you want to save this watering?</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => sendCreatedPlant(),
    });

  const sendCreatedPlant = () => {
    if (!message.match(/^.{0,30}$/)) {
      feedBackModals.ErrorModal({
        title: "Error",
        message: "The message may only contain 0-30 characters.",
      });
    }
    setwatered(true);

    plantService
      .createPlant(plantOB)
      .then(() => {
        feedBackModals.SuccessModal({
          title: "Success",
          message: "Your Watering is Saved",
        });

        getPlants();
      })
      .catch(function (error) {
        feedBackModals.ErrorModal({
          title: "Error",
          message: "Something went wrong, please try again later.",
        });
      });
  };

  return (
    <>
      <Card withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
        <Group position="apart">
          <img src="images/logo.svg"></img>

          <Burger
            color="white"
            opened={opened}
            onClick={() => {
              setOpened((o) => !o);
              navigate("/menu");
            }}
          ></Burger>
        </Group>

        <Container mt={30} mb={20}>
          <Text size="xl">
            Welcome
            <br /> {currentUser?.name}
          </Text>
        </Container>

        <Divider mb={20}></Divider>

        <Box>
          <Center>
            <TextInput
              placeholder="Make a Note"
              onChange={handleChangeMessage}
              pr={10}
              mb={5}
            ></TextInput>
            <Checkbox
              checked={fertilized}
              icon={CheckboxIcon1}
              indeterminate
              size="xl"
              styles={(theme) => ({
                input: {
                  backgroundColor: "#222222",
                  borderColor: "white",
                },
              })}
              onChange={handleChangeFertilized}
              radius={7}
            />
          </Center>
        </Box>

        <Button
          variant="outline"
          color="blue"
          radius="lg"
          size="lg"
          mt={20}
          mb={20}
          onClick={openConfirmModa}
        >
          Watered
        </Button>
      </Card>
    </>
  );
}
export default CreatePlant;
