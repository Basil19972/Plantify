import { SimpleGrid, Text, ThemeIcon, Center, Divider } from "@mantine/core";
import {
  IconCirclePlus,
  IconBolt,
  IconMail,
  IconBrandMessenger,
} from "@tabler/icons";
import Authentication from "../components/Authentication";

// Define an array of features with their icons, titles, and descriptions
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
  // Generate JSX elements for each feature item
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
      {/* Authentication component */}
      <Authentication />

      {/* Title */}
      <Text mt={40} size={"xl"}>
        Features{" "}
      </Text>

      {/* Divider */}
      <Divider></Divider>

      {/* SimpleGrid to display the feature items */}
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
