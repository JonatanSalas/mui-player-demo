import React from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";

import indigo from "@material-ui/core/colors/indigo";
import deepPurple from "@material-ui/core/colors/deepPurple";

import createTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import MuiAudioPlayer from "./AudioPlayer";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: indigo
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Grid justify="center" alignItems="center" container>
      <Grid item>
        <MuiAudioPlayer
          src="https://s9.converto.io/download-file/zwXZbmwDyWGN7qkqvVPMcQm0pIajpwdE/file.mp3"
          autoPlay={false}
        />
      </Grid>
    </Grid>
  </ThemeProvider>,
  document.getElementById("root")
);
