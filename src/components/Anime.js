import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import React, { Component } from 'react';

import Card from './Card';
import SearchBar from './SearchBar';

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

  componentDidMount() {
    const getTopAnime = async () => {
      const { offset } = this.state;
      const resp = await fetch(`https://api.jikan.moe/v3/top/anime`);
      const data = await resp.json();
      console.log(data.top.slice());
      console.log(data.top.length / topAnimeToReturn);
      const top5 = data.top.slice(offset, offset + topAnimeToReturn);
      this.setState({
        topAnime: [...top5],
        totalPages: data.top.length / topAnimeToReturn,
      });
    };
    getTopAnime();
  }

  fetchNewPage(page) {
    this.setState(
      {
        currentPage: page,
      },
      async () => {
        const { currentPage } = this.state;
        const offset = currentPage * topAnimeToReturn - 5;
        const resp = await fetch(`https://api.jikan.moe/v3/top/anime`);
        const data = await resp.json();
        const top5 = data.top.slice(offset, offset + topAnimeToReturn);
        this.setState({
          topAnime: [...top5],
        });
      },
    );
  }

  render() {
    const { topAnime, totalPages, currentPage } = this.state;
    return (
      <>
        <SearchBar title={title} searchRef={this.searchInput} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <h1>Top Anime!</h1>
        </Box>
        <Grid container justify='space-evenly'>
          {topAnime.map((anime) => (
            <Card
              key={anime.mal_id}
              image={anime.image_url}
              title={anime.title}
              startDate={anime.start_date}
            />
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => this.fetchNewPage(page)}
        />
      </>
    );
  }
}

export default Anime;
