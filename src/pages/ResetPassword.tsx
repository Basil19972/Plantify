import {
  Burger,
  Button,
  Card,
  CheckboxProps,
  Container,
  Divider,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconDroplet,
  IconBolt,
  IconInfoCircle,
  IconCheck,
  IconCircleCheck,
  IconLock,
} from "@tabler/icons";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import feedBackModals from "../components/modals/FeedBackModals";

function resetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmNewPassword(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let urlSearchParams = new URLSearchParams(window.location.search);
    let secret = urlSearchParams.get("secret");
    let userId = urlSearchParams.get("userId");

    if (userId === null || secret === null) {
      feedBackModals.ErrorModal({
        title: "Error",
        message: "Something went wrong",
      });
    } else {
      userService
        .completePasswordRecovery(
          userId,
          secret,
          newPassword,
          confirmNewPassword
        )
        .then(() => {
          feedBackModals.SuccessModal({
            title: "Success",
            message: "Password changed successfully",
          });
          navigate("/landingpage");
        })
        .catch((err) => {
          feedBackModals.ErrorModal({
            title: "Error",
            message: err.message,
          });
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
          <Group position="apart">
            <img src="images/logo.svg"></img>

            <Burger
              color="white"
              opened={true}
              onClick={() => {
                navigate("/menu");
              }}
            ></Burger>
          </Group>

          <Container mt={30} mb={20}>
            <IconLock color="yellow" size={40} />

            <Text size="xl">Set your Password</Text>
          </Container>

          <Divider mb={20}></Divider>

          <TextInput
            type="password"
            placeholder="New Password"
            onChange={handleNewPasswordChange}
            pr={10}
            mb={10}
          ></TextInput>
          <TextInput
            type="password"
            placeholder="Confirm new Password"
            onChange={handleConfirmNewPasswordChange}
            pr={10}
            mb={5}
          ></TextInput>
          <Button
            mt={10}
            color="green"
            size="sm"
            variant="outline"
            type="submit"
          >
            Ok
          </Button>
        </Card>
      </form>
    </>
  );
}
export default resetPassword;
