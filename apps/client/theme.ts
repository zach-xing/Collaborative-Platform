import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
      blue: {
        50: "#E5F4FD",
        100: "#C8E9FB",
        200: "#A8DCFA",
        300: "#83CDF7",
        400: "#57BBF5",
        500: "#1DA1F2",
        600: "#1A94DA",
        700: "#1681BF",
        800: "#136B9E",
        900: "#0D4D71",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
