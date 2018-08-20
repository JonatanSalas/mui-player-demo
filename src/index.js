import React from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";

import MuiAudioPlayer from "./AudioPlayer";

ReactDOM.render(
  <Grid justify="center" alignItems="center" container>
    <Grid item>
      <MuiAudioPlayer
        src="https://s9.converto.io/download-file/zwXZbmwDyWGN7qkqvVPMcQm0pIajpwdE/file.mp3"
        autoPlay={false}
      />
    </Grid>
  </Grid>,
  document.getElementById("root")
);
