import { Link } from "@tanstack/react-router";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Center,
} from "@yamada-ui/react";
import { SearchIcon, HouseIcon, ArrowLeftIcon } from "@yamada-ui/lucide";

export function NotFound({ children }: { children?: any }) {
  return (
    <Container as="main" centerContent h="100vh" bg={["gray.50", "gray.900"]}>
      <Center as={VStack} textAlign="center" maxW="600px">
        <SearchIcon w={20} h={20} color={["primary.500", "primary.400"]} />

        <Heading as="h1" size="2xl" color={["primary.600", "primary.400"]}>
          Page Not Found
        </Heading>

        <Text fontSize="lg" color={["gray.600", "gray.300"]} textAlign="center">
          {children ||
            "The page you are looking for does not exist or has been moved."}
        </Text>

        <HStack>
          <Button
            onClick={() => window.history.back()}
            colorScheme="secondary"
            startIcon={<ArrowLeftIcon />}
          >
            Go Back
          </Button>

          <Button
            as={Link}
            to="/"
            colorScheme="primary"
            startIcon={<HouseIcon />}
          >
            Home
          </Button>
        </HStack>
      </Center>
    </Container>
  );
}
