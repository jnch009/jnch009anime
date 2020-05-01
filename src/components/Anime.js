import Box from '@material-ui/core/Box';
import React, { Component } from 'react';

import SearchBar from './SearchBar';
import Section from './Section';

const title = `Anime for all your needs!`;
const fetchAnime = `https://api.jikan.moe/v3/top/anime`;
const fetchManga = `https://api.jikan.moe/v3/top/manga`;
const subTypeAnime = 'anime';
const subTypeManga = 'manga';
const subTypeSearch = 'search';
const topItemsToReturn = 5;

class Anime extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
    this.state = {
      topAnime: [],
      topManga: [],
      currentPageAnime: 1,
      currentPageManga: 1,
      currentPageSearch: 1,
      totalPagesAnime: 0,
      totalPagesManga: 0,
      offset: 0,
      search: false,
      queryResults: [],
      queryError: '',
    };
  }

  componentDidMount() {
    const getTop = async (url, subtype) => {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.status !== 400) {
        if (subtype === subTypeAnime) {
          await this.setState({
            topAnime: [...data.top],
          });
        } else if (subtype === subTypeManga) {
          await this.setState({
            topManga: [...data.top],
          });
        }
      } else {
        throw data.message;
      }
      return data.top.length / topItemsToReturn;
    };

    getTop(fetchAnime, subTypeAnime).then((data) => {
      this.setState({
        totalPagesAnime: data,
      });
    });

    getTop(fetchManga, subTypeManga).then((data) =>
      this.setState({
        totalPagesManga: data,
      }),
    );
  }

  fetchNewPage = (page, subtype) => {
    if (subtype === subTypeAnime) {
      this.setState({
        currentPageAnime: page,
      });
    } else if (subtype === subTypeManga) {
      this.setState({
        currentPageManga: page,
      });
    } else if (subtype === subTypeSearch) {
      this.setState({
        currentPageSearch: page,
      });
    }
  };

  handleSearch = (clicked) => {
    if (clicked) {
      this.setState({
        search: true,
      });
    } else {
      this.setState({
        search: false,
      });
    }
  };

  handleSearchQuery = async (e) => {
    // using the search endpoint
    const responseAnime = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${e.target.value}`,
    );
    console.log(responseAnime);
    const animeJSON = await responseAnime.json();
    console.log(animeJSON);

    if (animeJSON.status >= 400) {
      this.setState({
        queryError: animeJSON.message,
      });
    } else {
      this.setState({
        queryResults: [...animeJSON.results],
        queryError: '',
      });
    }
  };

  render() {
    const {
      topAnime,
      topManga,
      totalPagesAnime,
      totalPagesManga,
      currentPageAnime,
      currentPageManga,
      currentPageSearch,
      search,
      queryResults,
      queryError,
    } = this.state;
    return (
      <>
        <SearchBar
          title={title}
          searchRef={this.searchInput}
          handleSearchClick={this.handleSearch}
          handleSearchQuery={this.handleSearchQuery}
        />
        {search || queryResults.length !== 0 ? (
          <>
            {queryError.length !== 0 ? (
              <Box display='flex' justifyContent='center' m={15}>
                <h1>{queryError}</h1>
              </Box>
            ) : (
              <Section
                sectionTitle='Search Results'
                topSubtype={queryResults}
                totalPages={queryResults.length / 5}
                currentPage={currentPageSearch}
                subType={subTypeSearch}
                newPage={this.fetchNewPage}
                offset={currentPageSearch * topItemsToReturn - 5}
                topItemsToReturn={topItemsToReturn}
              />
            )}
          </>
        ) : (
          <>
            <Section
              sectionTitle='Top Anime!'
              topSubtype={topAnime}
              totalPages={totalPagesAnime}
              currentPage={currentPageAnime}
              subType={subTypeAnime}
              newPage={this.fetchNewPage}
              offset={currentPageAnime * topItemsToReturn - 5}
              topItemsToReturn={topItemsToReturn}
            />
            <hr />
            <Section
              sectionTitle='Top Manga!'
              topSubtype={topManga}
              totalPages={totalPagesManga}
              currentPage={currentPageManga}
              subType={subTypeManga}
              newPage={this.fetchNewPage}
              offset={currentPageManga * topItemsToReturn - 5}
              topItemsToReturn={topItemsToReturn}
            />
            <hr />
            <Box display='flex' flexDirection='column' alignItems='center'>
              <h2>What's the difference between Manga and Anime?</h2>
              <p>
                To oversimplify manga vs. anime, anime are TV shows or movies,
                while manga are comic books or graphic novels.
                <br />
                <br />
                For more information, here is the source:
                <a href='https://writingexplained.org/anime-vs-manga-difference'>
                  https://writingexplained.org/anime-vs-manga-difference
                </a>
              </p>
            </Box>
          </>
        )}
      </>
    );
  }
}

export default Anime;
