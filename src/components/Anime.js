import Box from "@material-ui/core/Box";
import React, { Component, Fragment } from "react";

import Card from "./Card";
import SearchBar from "./SearchBar";

const title = `Anime for all your needs!`;

class Anime extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
  }

  render() {
    return (
      <Fragment>
        <SearchBar title={title} searchRef={this.searchInput} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <p>this is a test paragraph</p>
        </Box>
        <Card></Card>
      </Fragment>
    );
  }
}

export default Anime;
