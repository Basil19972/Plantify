import {
  ActionIcon,
  Burger,
  Card,
  Checkbox,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import {
  IconLogout,
  IconMail,
  IconTrash,
  IconUser,
  IconLock,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserValues } from "../types/User.type";
import userService from "../services/user.service";
import feedBackModals from "../components/modals/FeedBackModals";

function Menupage() {
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const [user, setuser] = useState<UserValues>();

  useEffect(() => {
    // Fetch the current user and update the email notification preference
    userService
      .getCurrentUser()
      .then((res) => {
        setuser(res);
        setChecked(res.prefs.emailNotification);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const openConfirmation = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          You will be notified if the last watering was more than a week ago.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        // Toggle the email notification preference and update the user's settings
        userService
          .updateEmailNotification(!checked)
          .then(() => {
            feedBackModals.SuccessModal({
              title: "Success",
              message: "You have successfully changed the email notification",
            });
          })
          .catch((err) => {
            feedBackModals.ErrorModal({ title: "Error", message: err.message });
          });
        setChecked(!checked);
      },
    });

  return (
    <Card withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
      <Group position="apart">
        {/* Logo */}
        <img src="images/logo.svg"></img>

        {/* Burger menu button */}
        <Burger
          color="white"
          opened={opened}
          onClick={() => {
            setOpened((o) => !o);
            navigate("/");
          }}
        ></Burger>
      </Group>

      <Container mt={30}></Container>

      <Container mt={30}>
        <Group position="left">
          {/* User icon */}
          <IconUser color="white" size={20} />
          {/* User name */}
          <Text>{user?.name}</Text>
        </Group>
      </Container>

      <Container mt={10}>
        <Group position="left">
          {/* Mail icon */}
          <IconMail color="white" size={20} />
          {/* User email */}
          <Text>{user?.email}</Text>
        </Group>
      </Container>

      <Container mt={15}>
        <Group position="left">
          <ActionIcon color="yellow" variant="outline" size={30}>
            {/* Lock icon */}
            <IconLock
              size={18}
              onClick={() => {
                navigate("/changepassword");
              }}
            />
          </ActionIcon>
          <Text>Change Password</Text>
        </Group>
      </Container>

      <Container mt={30}>
        <Group position="left">
          {/* Checkbox for email notification */}
          <Checkbox
            checked={checked}
            onClick={() => {
              openConfirmation();
            }}
            color="green"
            size="lg"
          />
          <Text>Email Notification</Text>
        </Group>
      </Container>

      <Container mt={15}>
        <Group position="left">
          <ActionIcon
            size={30}
            color="red"
            variant="outline"
            onClick={() => {
              navigate("/delete");
            }}
          >
            {/* Trash icon */}
            <IconTrash size={18} />
          </ActionIcon>
          <Text>Delete Waterings</Text>
        </Group>
      </Container>

      <Container mt={15}>
        <Group position="left">
          <ActionIcon color="red" variant="outline" size={30}>
            {/* Logout icon */}
            <IconLogout
              size={18}
              onClick={() => {
                // Logout the user and refresh the page
                userService
                  .logoutUser()
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    feedBackModals.ErrorModal({
                      title: "Error",
                      message: err.message,
                    });
                  });
              }}
            />
          </ActionIcon>
          <Text>Logout</Text>
        </Group>
      </Container>
    </Card>
  );
}

export default Menupage;
