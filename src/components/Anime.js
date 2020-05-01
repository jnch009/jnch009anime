import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component, Fragment } from "react";

import Card from "./Card";
import SearchBar from "./SearchBar";

const title = `Anime for all your needs!`;
const topAnimeToReturn = 5;
class Anime extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
    this.state = {
      topAnime: [],
      currentPage: 1,
      totalPages: 0,
      offset: 0,
    };
  }

  fetchNewPage(page) {
    this.setState(
      {
        currentPage: page,
      },
      async () => {
        const offset = this.state.currentPage * topAnimeToReturn - 5;
        const resp = await fetch(`https://api.jikan.moe/v3/top/anime`);
        const data = await resp.json();
        const top5 = data.top.slice(offset, offset + topAnimeToReturn);
        this.setState({
          topAnime: [...top5],
        });
      }
    );
  }

  componentDidMount() {
    const getTopAnime = async () => {
      const resp = await fetch(`https://api.jikan.moe/v3/top/anime`);
      const data = await resp.json();
      console.log(data.top.slice());
      console.log(data.top.length / topAnimeToReturn);
      const top5 = data.top.slice(
        this.state.offset,
        this.state.offset + topAnimeToReturn
      );
      this.setState({
        topAnime: [...top5],
        totalPages: data.top.length / topAnimeToReturn,
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
        <Pagination
          count={this.state.totalPages}
          page={this.state.currentPage}
          onChange={(e, page) => this.fetchNewPage(page)}
        ></Pagination>
      </Fragment>
    );
  }
}

export default Anime;
