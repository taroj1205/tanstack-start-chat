import { Link, type LinkProps } from "@tanstack/react-router";
import {
  FC,
  LinkProps as YamadaLinkProps,
  Link as YamadaLink,
  Button,
  ButtonProps,
} from "@yamada-ui/react";
import { memo } from "react";

export const UILink: FC<YamadaLinkProps & LinkProps> = memo((props) => {
  return <YamadaLink as={Link} {...props} />;
});

UILink.displayName = "UILink";

export const UIButtonLink: FC<ButtonProps & LinkProps> = memo((props) => {
  return <Button as={Link} variant="link" {...props} />;
});

UIButtonLink.displayName = "UIButtonLink";
