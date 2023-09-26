import { CssBaseline, ThemeProvider } from "@mui/material";
import { FieldPluginProvider } from "@storyblok/field-plugin/react";
import { lightTheme } from "@storyblok/mui";
import { ExternalContentFieldPlugin } from "./components/ExternalContentFieldPlugin.js";

export function App() {
  return (
    <FieldPluginProvider
      Loading={Loading}
      Error={Error}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ExternalContentFieldPlugin />
      </ThemeProvider>
    </FieldPluginProvider>
  );
}

const Loading = () => <p>Loading...</p>;
const Error = (props: { error: Error }) => {
  console.error(props.error);
  return <p>An error occured, please see the console for more details.</p>;
};
