import React from "react";
import "./App.css";

import Grid from "@material-ui/core/Grid";
import Master from "./components/master";

function App() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="container"
    >
      <Master />
    </Grid>
  );
}

export default App;
