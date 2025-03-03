import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  HStack,
  Center,
} from "@yamada-ui/react";
import { MessageCircleIcon, UsersIcon, LockIcon } from "@yamada-ui/lucide";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Container as="main" centerContent h="100svh" placeContent="center">
      <Center as={VStack} gap="lg">
        <Heading
          as="h1"
          size="3xl"
          fontWeight="bold"
          color={["primary.600", "primary.400"]}
          lineHeight="1"
        >
          Welcome to ChatConnect
        </Heading>

        <Text fontSize="xl" color={["gray.600", "gray.300"]}>
          Your secure, intuitive platform for seamless communication
        </Text>

        <Center as={HStack}>
          <Card variant="outline">
            <CardHeader justifyContent="center">
              <MessageCircleIcon w={10} h={10} color="primary.500" />
            </CardHeader>
            <CardBody>
              <Text fontWeight="bold">Real-time Messaging</Text>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardHeader justifyContent="center">
              <UsersIcon w={10} h={10} color="primary.500" />
            </CardHeader>
            <CardBody>
              <Text fontWeight="bold">Connect with Others</Text>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardHeader justifyContent="center">
              <LockIcon w={10} h={10} color="primary.500" />
            </CardHeader>
            <CardBody>
              <Text fontWeight="bold">End-to-End Encryption</Text>
            </CardBody>
          </Card>
        </Center>

        <Suspense>
          <Button
            as={Link}
            to="/auth"
            size="lg"
            colorScheme="primary"
            startIcon={<MessageCircleIcon />}
            w="fit-content"
          >
            Get Started
          </Button>
        </Suspense>
      </Center>
    </Container>
  );
}
