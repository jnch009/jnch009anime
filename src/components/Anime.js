import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import React, { Component } from 'react';

import Card from './Card';
import SearchBar from './SearchBar';

const title = `Anime for all your needs!`;
const topItemsToReturn = 5;
const fetchAnime = `https://api.jikan.moe/v3/top/anime`;
const fetchManga = `https://api.jikan.moe/v3/top/manga`;
const subTypeAnime = 'anime';
const subTypeManga = 'manga';

class Anime extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
    this.state = {
      topAnime: [],
      topManga: [],
      currentPageAnime: 1,
      currentPageManga: 1,
      totalPagesAnime: 0,
      totalPagesManga: 0,
      offset: 0,
    };
  }

  componentDidMount() {
    const getTop = async (url, subtype) => {
      const { offset } = this.state;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.status !== 400) {
        const top5 = data.top.slice(offset, offset + topItemsToReturn);
        if (subtype === subTypeAnime) {
          await this.setState({
            topAnime: [...top5],
          });
        } else if (subtype === subTypeManga) {
          await this.setState({
            topManga: [...top5],
          });
        }
      } else {
        throw data.message;
      }
      return data.top.length / topItemsToReturn;
    };

    getTop(fetchAnime, subTypeAnime).then((data) =>
      this.setState({
        totalPagesAnime: data,
      }),
    );

    getTop(fetchManga, subTypeManga).then((data) =>
      this.setState({
        totalPagesManga: data,
      }),
    );
  }

  fetchNewPage(page, subtype) {
    if (subtype === subTypeAnime) {
      this.setState(
        {
          currentPageAnime: page,
        },
        async () => {
          const { currentPageAnime } = this.state;
          const offset = currentPageAnime * topItemsToReturn - 5;
          const resp = await fetch(fetchAnime);
          const data = await resp.json();
          const top5 = data.top.slice(offset, offset + topItemsToReturn);
          this.setState({
            topAnime: [...top5],
          });
        },
      );
    } else if (subtype === subTypeManga) {
      this.setState(
        {
          currentPageManga: page,
        },
        async () => {
          const { currentPageManga } = this.state;
          const offset = currentPageManga * topItemsToReturn - 5;
          const resp = await fetch(fetchManga);
          const data = await resp.json();
          const top5 = data.top.slice(offset, offset + topItemsToReturn);
          this.setState({
            topManga: [...top5],
          });
        },
      );
    }
  }

  render() {
    const {
      topAnime,
      topManga,
      totalPagesAnime,
      totalPagesManga,
      currentPage,
    } = this.state;
    return (
      <>
        <SearchBar title={title} searchRef={this.searchInput} />
        <Box mt={10}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <h1>Top Anime!</h1>
          </Box>
          <Grid container justify='space-evenly'>
            {topAnime.length === 0 ? (
              <h1>Loading</h1>
            ) : (
              topAnime.map((anime) => (
                <Card
                  key={anime.mal_id}
                  image={anime.image_url}
                  title={anime.title}
                  startDate={anime.start_date}
                />
              ))
            )}
          </Grid>
          <Box display='flex' justifyContent='center'>
            <Pagination
              count={totalPagesAnime}
              page={currentPage}
              onChange={(e, page) => this.fetchNewPage(page, subTypeAnime)}
            />
          </Box>
        </Box>
        <hr />
        <Box mt={10}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <h1>Top Manga!</h1>
          </Box>
          <Grid container justify='space-evenly'>
            {topManga.length === 0 ? (
              <h1>Loading</h1>
            ) : (
              topManga.map((manga) => (
                <Card
                  key={manga.mal_id}
                  image={manga.image_url}
                  title={manga.title}
                  startDate={manga.start_date}
                />
              ))
            )}
          </Grid>
          <Box display='flex' justifyContent='center'>
            <Pagination
              count={totalPagesManga}
              page={currentPage}
              onChange={(e, page) => this.fetchNewPage(page, subTypeManga)}
            />
          </Box>
        </Box>
        <hr />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <h2>What's the difference between Manga and Anime?</h2>
          <p>
            To oversimplify manga vs. anime, anime are TV shows or movies, while
            manga are comic books or graphic novels.
            <br />
            <br />
            For more information, here is the source:
            <a href='https://writingexplained.org/anime-vs-manga-difference'>
              https://writingexplained.org/anime-vs-manga-difference
            </a>
          </p>
        </Box>
      </>
    );
  }
}

export default Anime;
