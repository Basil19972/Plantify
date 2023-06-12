import {
  Burger,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { IconLock } from "@tabler/icons";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import feedBackModals from "../components/modals/FeedBackModals";

function ChangePassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);
  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOldPassword(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8 || oldPassword.length < 8) {
      feedBackModals.ErrorModal({
        title: "Error",
        message: "Password must be at least 8 characters long",
      });
    } else {
      userService
        .changePassword(newPassword, oldPassword)
        .then(() => {
          navigate("/menu");
          feedBackModals.SuccessModal({
            title: "Success",
            message: "Password changed successfully",
          });
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
            placeholder="Old Password"
            onChange={handleOldPasswordChange}
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
export default ChangePassword;
