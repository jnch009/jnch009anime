import Box from "@material-ui/core/Box";
import React, { Component, Fragment } from "react";

class Anime extends Component {
  render() {
    return (
      <Fragment>
        <Box display="flex" flexDirection="column" alignItems="center">
          <h1>Anime for all your needs!</h1>
          <p>this is a test paragraph</p>
        </Box>
      </Fragment>
    );
  }
}

export default Anime;
