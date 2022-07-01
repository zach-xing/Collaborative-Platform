import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  withDefaultColorScheme({ colorScheme: "twitter" })
);

export default theme;
