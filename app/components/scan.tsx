import { memo, useEffect } from "react";
import { scan } from "react-scan";

export const Scan = memo(() => {
  useEffect(() => {
    scan({
      enabled: process.env.NODE_ENV === "development",
    });
  }, []);
  return null;
});
