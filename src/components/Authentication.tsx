import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import feedBackModals from "../components/modals/FeedBackModals";
import { openConfirmModal } from "@mantine/modals";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

function AuthenticationForm() {
  const navigate = useNavigate();

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 8 characters"
          : null,
      username: (val) =>
        val.length > 12 ? "Username should incloud max 12 characters" : null,
    },
  });

  return (
    <Paper withBorder bg={"#222222"} c={"white"} radius={20} p="xl">
      <img src="images/logo.svg"></img>

      <Text size="lg" weight={500}>
        Plantify, {type} with:
      </Text>

      <Group grow mb="md" mt="md"></Group>

      <form
        onSubmit={form.onSubmit(() => {
          if (type === "register") {
            openConfirmModal({
              styles: {
                modal: {
                  backgroundColor: "#222222",
                  borderRadius: "10px",
                  border: "solid",
                  borderColor: "white",
                  borderWidth: "2px",
                  color: "white",
                },
              },
              transition: "fade",
              transitionDuration: 600,
              title: "Please check your details",

              children: (
                <Text size="sm">
                  Would you like to create your account with {form.values.email}
                  ?
                </Text>
              ),
              labels: { confirm: "Confirm", cancel: "Cancel" },
              onCancel: () => console.log("Cancel"),
              onConfirm: () => {
                userService
                  .createUser({
                    username: form.values.username,
                    email: form.values.email,
                    password: form.values.password,
                  })
                  .then((response) => {
                    userService
                      .loginUser({
                        email: form.values.email,
                        password: form.values.password,
                      })
                      .then(async () => {
                        await userService.startEmailVerification().then(() => {
                          window.location.reload();
                        });
                      })
                      .catch((error) => {
                        feedBackModals.ErrorModal({
                          title: "Error",
                          message: error.message,
                        });
                      });
                  })
                  .catch((error) => {
                    feedBackModals.ErrorModal({
                      title: "Error",
                      message: error.message,
                    });
                  });
              },
            });
          } else {
            userService
              .loginUser({
                email: form.values.email,
                password: form.values.password,
              })
              .then((response) => {
                window.location.reload();
              })
              .catch((error) => {
                feedBackModals.ErrorModal({
                  title: "Error",
                  message: error.message,
                });
              });
          }
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              mb={10}
              required
              placeholder="Your Username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              error={
                form.errors.username &&
                "Username should incloud max 12 characters"
              }
            />
          )}

          <TextInput
            mb={10}
            required
            placeholder="Your@Email.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            mb={10}
            required
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 8 characters"
            }
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => navigate("/forgetpassword")}
            size="xs"
          >
            Forgot password?
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}
export default AuthenticationForm;
