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

  // State variables for storing new and old passwords
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  // Event handlers for password input changes
  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);
  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOldPassword(e.target.value);

  // Form submission handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check if passwords meet the length requirement
    if (newPassword.length < 8 || oldPassword.length < 8) {
      // Show error modal if passwords are too short
      feedBackModals.ErrorModal({
        title: "Error",
        message: "Password must be at least 8 characters long",
      });
    } else {
      // Call userService to change the password
      userService
        .changePassword(newPassword, oldPassword)
        .then(() => {
          // Navigate to the menu page and show success modal
          navigate("/menu");
          feedBackModals.SuccessModal({
            title: "Success",
            message: "Password changed successfully",
          });
        })
        .catch((err) => {
          // Show error modal with the error message if changing password fails
          feedBackModals.ErrorModal({
            title: "Error",
            message: err.message,
          });
        });
    }
  };

  return (
    <>
      {/* Password change form */}
      <form onSubmit={handleSubmit}>
        <Card withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
          <Group position="apart">
            {/* Logo */}
            <img src="images/logo.svg"></img>

            {/* Burger menu button */}
            <Burger
              color="white"
              opened={true}
              onClick={() => {
                navigate("/menu");
              }}
            ></Burger>
          </Group>

          <Container mt={30} mb={20}>
            {/* Lock icon */}
            <IconLock color="yellow" size={40} />

            {/* Text */}
            <Text size="xl">Set your Password</Text>
          </Container>

          {/* Divider */}
          <Divider mb={20}></Divider>

          {/* New password input */}
          <TextInput
            type="password"
            placeholder="New Password"
            onChange={handleNewPasswordChange}
            pr={10}
            mb={10}
          ></TextInput>

          {/* Old password input */}
          <TextInput
            type="password"
            placeholder="Old Password"
            onChange={handleOldPasswordChange}
            pr={10}
            mb={5}
          ></TextInput>

          {/* Submit button */}
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
