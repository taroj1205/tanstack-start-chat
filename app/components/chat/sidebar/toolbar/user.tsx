import { FC, memo } from "react";
import {
  Grid,
  GridItem,
  Avatar,
  VStack,
  Text,
  AvatarBadge,
  AvatarProps,
  GridItemProps,
  MenuOptionGroup,
  MenuOptionItem,
  Button,
  Menu,
  MenuItem,
  MenuButton,
  useColorMode,
  MenuList,
  MenuItemButton,
  GridProps,
} from "@yamada-ui/react";
import type { UserProps } from "~/lib/channels";
import type { User as BetterAuthUser } from "better-auth";

export type UserComponentProps = {
  text: string;
  timestamp?: string;
  user: BetterAuthUser;
  indicator?: boolean;
  avatarProps?: AvatarProps;
  userProps?: GridItemProps;
};

export const UserComponent: FC<GridProps & UserComponentProps> = memo(
  ({ text, timestamp, user, indicator, avatarProps, userProps, ...props }) => {
    const { colorMode, changeColorMode } = useColorMode();
    return (
      <Menu lazy>
        <MenuButton as={Button} variant="ghost" size="lg">
          <Grid
            gridTemplateColumns="auto 1fr"
            gap="sm"
            lineHeight="1"
            w="full"
            justifyContent="center"
            {...props}
          >
            <GridItem>
              <Avatar
                name={user.name}
                src={user.image ?? undefined}
                {...avatarProps}
              >
                {indicator && (
                  <AvatarBadge
                    boxSize="1.25em"
                    // bg={
                    //   user.status === "Online"
                    //     ? "green.500"
                    //     : user.status === "Do not disturb"
                    //       ? "red.500"
                    //       : user.status === "Offline"
                    //         ? "yellow.500"
                    //         : "gray.500"
                    // }
                    bg="green.500"
                    borderWidth="2px"
                  />
                )}
              </Avatar>
            </GridItem>
            <GridItem {...userProps}>
              <VStack gap="xs">
                <Text fontWeight="semibold">{user.name}</Text>
                <Text color="muted" fontSize="xs">
                  {/* {user.status} */}
                  Online
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </MenuButton>

        <MenuList>
          <MenuItem>
            <Menu closeOnSelect={false}>
              <MenuItemButton>Color Mode</MenuItemButton>

              <MenuList>
                <MenuOptionGroup
                  defaultValue={colorMode}
                  type="radio"
                  onChange={changeColorMode}
                >
                  <MenuOptionItem value="dark">Dark</MenuOptionItem>
                  <MenuOptionItem value="light">Light</MenuOptionItem>
                  <MenuOptionItem value="system">System</MenuOptionItem>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </MenuItem>
          <MenuItem>Edit Profile</MenuItem>
          <MenuItem>Preferences</MenuItem>
        </MenuList>
      </Menu>
    );
  }
);

UserComponent.displayName = "UserComponent";
