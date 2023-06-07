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

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(email);

    await userService
      .forgotPassword(email)
      .then(() => {
        feedBackModals.SuccessModal({
          title: "Success",
          message: "Email sent successfully",
        });
      })
      .catch((err) => {
        feedBackModals.ErrorModal({
          title: "Error",
          message: "Something went wrong",
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
          <Group position="apart">
            <img src="images/logo.svg"></img>
          </Group>

          <Container mt={30} mb={20}>
            <IconLock color="yellow" size={40} />

            <Text size="xl">Send recovery Link</Text>
          </Container>

          <Divider mb={20}></Divider>

          <TextInput
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            pr={10}
            mb={10}
          ></TextInput>

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
