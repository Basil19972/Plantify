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
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import feedBackModals from "../components/modals/FeedBackModals";

function ForgetPassword() {
  const navigate = useNavigate();

  // State variable for storing the email
  const [email, setEmail] = useState<string>("");

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Call userService to send a password recovery email
    await userService
      .forgotPassword(email)
      .then(() => {
        // Show success modal if email is sent successfully
        feedBackModals.SuccessModal({
          title: "Success",
          message: "Email sent successfully",
        });
      })
      .catch((err) => {
        // Show error modal with the error message if sending email fails
        feedBackModals.ErrorModal({ title: "Error", message: err.message });
      });
  };

  return (
    <>
      {/* Password recovery form */}
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
                navigate("/landingpage");
              }}
            ></Burger>
          </Group>

          <Container mt={30} mb={20}>
            {/* Lock icon */}
            <IconLock color="yellow" size={40} />

            {/* Text */}
            <Text size="xl">Send recovery Link</Text>
          </Container>

          {/* Divider */}
          <Divider mb={20}></Divider>

          {/* Email input */}
          <TextInput
            type="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            pr={10}
            mb={10}
          ></TextInput>

          {/* Submit button */}
          <Button
            mt={10}
            color="green"
            size="sm"
            variant="outline"
            type="submit"
          >
            Send
          </Button>
        </Card>
      </form>
    </>
  );
}

export default ForgetPassword;
