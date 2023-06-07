import {
  Burger,
  Card,
  CheckboxProps,
  Container,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import {
  IconDroplet,
  IconBolt,
  IconInfoCircle,
  IconCheck,
  IconCircleCheck,
} from "@tabler/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

function VerificationSuccsess() {
  const navigate = useNavigate();

  useEffect(() => {
    let urlSearchParams = new URLSearchParams(window.location.search);
    let secret = urlSearchParams.get("secret");
    let userId = urlSearchParams.get("userId");

    if (secret === null || userId === null) {
      throw new Error("Secret and UserId must not be null.");
    }

    userService.completeEmailVerification(userId, secret);
  }, []);

  return (
    <>
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
          <IconCircleCheck color="green" size={40} />

          <Text size="xl">Verification Succesfull</Text>
        </Container>

        <Divider mb={20}></Divider>
      </Card>
    </>
  );
}
export default VerificationSuccsess;
