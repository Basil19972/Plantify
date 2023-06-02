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
import { IconLogout, IconMail, IconTrash, IconUser } from "@tabler/icons";
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
    userService.getCurrentUser().then((res) => {
      setuser(res);
      setChecked(res.prefs.emailNotification);
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
        userService.updateEmailNotification(!checked).then(() => {
          feedBackModals.SuccessModal({
            title: "Success",
            message: "You have successfully changed the email notification",
          });
        });
        setChecked(!checked);
      },
    });

  return (
    <Card w={"307px"} withBorder bg={"#222222"} p={20} c={"white"} radius={20}>
      <Group position="apart">
        <img src="images/plant.svg"></img>

        <Burger
          color="white"
          opened={opened}
          onClick={() => {
            setOpened((o) => !o);
            navigate("/");
          }}
        ></Burger>
      </Group>
      <Container mt={30}>
        <Group position="left">
          <IconUser color="white" size={20} />
          <Text>{user?.name}</Text>
        </Group>
      </Container>
      <Container mt={10}>
        <Group position="left">
          <IconMail color="white" size={20} />
          <Text>{user?.email}</Text>
        </Group>
      </Container>

      <Container mt={30}>
        <Group position="left">
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
            <IconTrash size={18} />
          </ActionIcon>
          <Text>Delete Waterings</Text>
        </Group>
      </Container>

      <Container mt={15}>
        <Group position="left">
          <ActionIcon color="red" variant="outline" size={30}>
            <IconLogout
              size={18}
              onClick={() => {
                userService.logoutUser().then(() => {
                  window.location.reload();
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
