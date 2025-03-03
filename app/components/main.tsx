import { Container, type ContainerProps, FC, memo } from "@yamada-ui/react";

export const Main: FC<ContainerProps> = memo(({ children, ...props }) => {
  return (
    <Container as="main" centerContent {...props}>
      {children}
    </Container>
  );
});

Main.displayName = "Main";
