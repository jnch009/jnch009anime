import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React, { Component, Fragment } from "react";

import Card from "./Card";
import SearchBar from "./SearchBar";

const title = `Anime for all your needs!`;
const topAnimeToReturn = 4;
class Anime extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
    this.state = {
      topAnime: [],
    };
  }

  componentDidMount() {
    const getTopAnime = async () => {
      const resp = await fetch(`https://api.jikan.moe/v3/top/anime`);
      const data = await resp.json();
      const top4 = data.top.slice(0, topAnimeToReturn);
      console.log(top4);
      this.setState({
        topAnime: [...this.state.topAnime, ...top4],
      });
    };
    getTopAnime();
  }

  render() {
    return (
      <Fragment>
        <SearchBar title={title} searchRef={this.searchInput} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <h1>Top Anime!</h1>
        </Box>
        <Grid container justify="space-evenly">
          {this.state.topAnime.map((anime) => (
            <Card
              key={anime.mal_id}
              image={anime.image_url}
              title={anime.title}
              startDate={anime.start_date}
            ></Card>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

export default Anime;
