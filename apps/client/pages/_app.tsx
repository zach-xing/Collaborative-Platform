import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "../layout";
import theme from "../theme";
import "../global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
