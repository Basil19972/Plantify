// Importing required dependencies and components
import {
  Alert,
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
import { IconBolt, IconAlertCircle } from "@tabler/icons";
import { useState } from "react";
import { openConfirmModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import feedBackModals from "../components/modals/FeedBackModals";
import plantService from "../services/plant.service";
import { UserValues } from "../types/User.type";
import userService from "../services/user.service";

function CreatePlant({
  currentUser,
  getPlants,
}: {
  currentUser: UserValues;
  getPlants: () => void;
}) {
  // Setting up state variables
  const [watered, setwatered] = useState(true);
  const [fertilized, setfertilized] = useState<boolean>(false);
  const [message, setmessage] = useState("");
  const [opened, setOpened] = useState(false);

  // Custom checkbox icon
  const CheckboxIcon1: CheckboxProps["icon"] = ({ className }) => (
    <IconBolt className={className} color={"yellow"} />
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

  const sendVerification = () => {
    userService
      .startEmailVerification()
      .then(() => {
        feedBackModals.SuccessModal({
          title: "Success",
          message: "We have sent you a verification email",
        });
      })
      .catch((err) => {
        feedBackModals.ErrorModal({
          title: "Error",
          message: "Something went wrong",
        });
      });
  };

  const openEmailNotVerifiedAlert = () => {
    // Display an alert if email is not verified
    return (
      <Alert
        mb={20}
        variant="outline"
        icon={<IconAlertCircle size="1rem" />}
        title="Email not verified, check your inbox for verification link"
        color="red"
        bg={"#222222"}
      >
        <Button
          onClick={sendVerification}
          color="green"
          size="sm"
          variant="outline"
        >
          Send Link again
        </Button>
      </Alert>
    );
  };

  const openConfirmModa = () =>
    openConfirmModal({
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
      title: "Please confirm your action",
      children: (
        <Text size="sm">Are you sure you want to save this watering?</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => sendCreatedPlant(),
    });

  const sendCreatedPlant = () => {
    const regex = /^.{0,30}$/.exec(message);
    if (!regex) {
      // Show an error modal if the message exceeds the character limit
      feedBackModals.ErrorModal({
        title: "Error",
        message: "The message may only contain 0-30 characters.",
      });
    }

    setwatered(true);

    plantService
      .createWatering(plantOB)
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
      {!currentUser.emailVerification ? openEmailNotVerifiedAlert() : null}
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
            <div className="checkbox-container">
              <Checkbox
                checked={fertilized}
                icon={CheckboxIcon1}
                indeterminate
                size="xl"
                styles={(theme) => ({
                  input: {
                    backgroundColor: "#222222",
                    borderColor: "white",
                    zIndex: 1,
                  },
                })}
                onChange={handleChangeFertilized}
                radius={7}
              />
            </div>
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
