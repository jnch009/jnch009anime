import Box from '@material-ui/core/Box';
import React, { Component } from 'react';

import SearchBar from './SearchBar';

import Section from './Section';

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
      search: false,
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

  // fetchNewPage(page, subtype) {
  //   if (subtype === subTypeAnime) {
  //     this.setState(
  //       {
  //         currentPageAnime: page,
  //       },
  //       async () => {
  //         const { currentPageAnime } = this.state;
  //         const offset = currentPageAnime * topItemsToReturn - 5;
  //         const resp = await fetch(fetchAnime);
  //         const data = await resp.json();
  //         const top5 = data.top.slice(offset, offset + topItemsToReturn);
  //         this.setState({
  //           topAnime: [...top5],
  //         });
  //       },
  //     );
  //   } else if (subtype === subTypeManga) {
  //     this.setState(
  //       {
  //         currentPageManga: page,
  //       },
  //       async () => {
  //         const { currentPageManga } = this.state;
  //         const offset = currentPageManga * topItemsToReturn - 5;
  //         const resp = await fetch(fetchManga);
  //         const data = await resp.json();
  //         const top5 = data.top.slice(offset, offset + topItemsToReturn);
  //         this.setState({
  //           topManga: [...top5],
  //         });
  //       },
  //     );
  //   }
  // }

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

  render() {
    const {
      topAnime,
      topManga,
      totalPagesAnime,
      totalPagesManga,
      currentPageAnime,
      currentPageManga,
      search,
    } = this.state;
    return (
      <>
        <SearchBar
          title={title}
          searchRef={this.searchInput}
          handleSearchClick={this.handleSearch}
        />
        <Section
          sectionTitle='Top Anime!'
          topSubtype={topAnime}
          totalPages={totalPagesAnime}
          currentPage={currentPageAnime}
          subType={subTypeAnime}
        />
        <hr />
        <Section
          sectionTitle='Top Manga!'
          topSubtype={topManga}
          totalPages={totalPagesManga}
          currentPage={currentPageManga}
          subType={subTypeManga}
        />
        <hr />
        {search ? (
          <h1>Search</h1>
        ) : (
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
        )}
      </>
    );
  }
}

export default Anime;
