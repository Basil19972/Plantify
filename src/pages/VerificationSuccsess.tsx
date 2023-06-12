import {
  Burger,
  Card,
  CheckboxProps,
  Container,
  Divider,
  Group,
  Text,
  Loader,
} from "@mantine/core";
import {
  IconDroplet,
  IconBolt,
  IconInfoCircle,
  IconCheck,
  IconCircleCheck,
  IconAlertCircle,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

function VerificationSuccsess() {
  const [succesfull, setSuccesfull] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let urlSearchParams = new URLSearchParams(window.location.search);
    let secret = urlSearchParams.get("secret");
    let userId = urlSearchParams.get("userId");

    if (secret === null || userId === null) {
      setSuccesfull(false);
      setIsLoading(false);
    } else {
      userService
        .completeEmailVerification(userId, secret)
        .then(() => {
          setSuccesfull(true);
          setIsLoading(false);
        })
        .catch(() => {
          setSuccesfull(false);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <Container>
        <Loader color="lime" size="xl" variant="bars" mt={400} />
      </Container>
    );
  }

  return (
    <>
      <Card withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
        <Group position="apart">
          <img src="images/logo.svg"></img>
          <Burger
            color="white"
            opened={true}
            onClick={() => {
              navigate("/");
            }}
          ></Burger>
        </Group>

        <Container mt={30} mb={20}>
          {succesfull ? (
            <>
              <IconCircleCheck color="green" size={40} />
              <Text size="xl">Verification Succesfull</Text>
            </>
          ) : (
            <>
              <IconAlertCircle color="red" size={40} />
              <Text size="xl">Verification Failed</Text>
            </>
          )}
        </Container>

        <Divider mb={20}></Divider>
      </Card>
    </>
  );
}
export default VerificationSuccsess;
