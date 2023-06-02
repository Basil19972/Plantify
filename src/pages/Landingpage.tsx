import {
  createStyles,
  SimpleGrid,
  Text,
  ThemeIcon,
  Center,
  Divider,
} from "@mantine/core";
import {
  IconCirclePlus,
  IconBolt,
  IconMail,
  IconBrandMessenger,
} from "@tabler/icons";
import Authentication from "../components/Authentication";

const useStyles = createStyles((theme) => ({
  wrapper: { padding: 30, width: 400 },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "light" ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: IconCirclePlus,
    title: "Create waterings",
    description:
      "Create records in which you save when and how you watered your plants.",
  },
  {
    icon: IconBolt,
    title: "Fertiliser used",
    description: "Select if you have also fertilised your plants",
  },
  {
    icon: IconMail,
    title: "Be notified",
    description:
      "Your plants will send you an email if you forget to water them.",
  },
  {
    icon: IconBrandMessenger,
    title: "Notes",
    description: "Write short messages or notes about your plants",
  },
];

function LandingPage() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "green", to: "cyan" }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>

      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Center>
        <Text style={{ maxWidth: 250 }} color="white" size="sm">
          {feature.description}
        </Text>
      </Center>
    </div>
  ));

  return (
    <>
      <Authentication />
      <Text mt={40} size={"xl"}>
        Features{" "}
      </Text>
      <Divider></Divider>
      <SimpleGrid
        mt={20}
        cols={1}
        spacing={30}
        breakpoints={[{ maxWidth: "xs", cols: 1 }]}
      >
        {items}
      </SimpleGrid>
    </>
  );
}
export default LandingPage;
