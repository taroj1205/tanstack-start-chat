import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Center,
} from "@yamada-ui/react";
import { TriangleAlertIcon, RefreshCwIcon, HouseIcon } from "@yamada-ui/lucide";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <Container as="main" centerContent h="100vh" bg={["gray.50", "gray.900"]}>
      <Center as={VStack} textAlign="center" maxW="600px" p={4}>
        <TriangleAlertIcon w={20} h={20} color={["red.500", "red.400"]} />

        <Heading as="h1" size="2xl" color={["red.600", "red.400"]}>
          Oops! Something Went Wrong
        </Heading>

        <Text fontSize="lg" color={["gray.600", "gray.300"]} textAlign="center">
          An unexpected error occurred. Don't worry, we're here to help.
        </Text>

        <ErrorComponent error={error} />

        <HStack>
          <Button
            onClick={() => router.invalidate()}
            colorScheme="primary"
            startIcon={<RefreshCwIcon />}
          >
            Try Again
          </Button>

          {isRoot ? (
            <Button
              as={Link}
              to="/"
              colorScheme="secondary"
              startIcon={<HouseIcon />}
            >
              Home
            </Button>
          ) : (
            <Button
              onClick={() => window.history.back()}
              colorScheme="secondary"
              startIcon={<HouseIcon />}
            >
              Go Back
            </Button>
          )}
        </HStack>
      </Center>
    </Container>
  );
}
