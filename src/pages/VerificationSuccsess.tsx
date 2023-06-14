// Importing required dependencies and components
import {
  Burger,
  Card,
  Container,
  Divider,
  Group,
  Text,
  Loader,
} from "@mantine/core";
import { IconCircleCheck, IconAlertCircle } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

function VerificationSuccsess() {
  // Setting up state variables
  const [succesfull, setSuccesfull] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Extracting query parameters from the URL
    let urlSearchParams = new URLSearchParams(window.location.search);
    let secret = urlSearchParams.get("secret");
    let userId = urlSearchParams.get("userId");

    if (secret === null || userId === null) {
      // If secret or userId is missing, set verification as unsuccessful
      setSuccesfull(false);
      setIsLoading(false);
    } else {
      // Call the userService to complete email verification
      userService
        .completeEmailVerification(userId, secret)
        .then(() => {
          // Verification successful
          setSuccesfull(true);
          setIsLoading(false);
        })
        .catch(() => {
          // Verification failed
          setSuccesfull(false);
          setIsLoading(false);
        });
    }
  }, []);

  // Render a loader while isLoading is true
  if (isLoading) {
    return (
      <Container>
        <Loader color="lime" size="xl" variant="bars" mt={400} />
      </Container>
    );
  }

  // Render the result of the verification
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
            // Display success message and icon if verification is successful
            <>
              <IconCircleCheck color="green" size={40} />
              <Text size="xl">Verification Succesfull</Text>
            </>
          ) : (
            // Display failure message and icon if verification fails
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
