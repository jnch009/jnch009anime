import Box from '@material-ui/core/Box';
import React, { Component } from 'react';

import SearchBar from './SearchBar';
import Section from './Section';
import Credits from './Credits';
import FAQ from './FAQ';
import TopResults from './TopResults';
import { helperVariables, helperFunctions } from '../utility';

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
      searchQuery: '',
      queryResults: [],
      queryError: ''
    };
  }

  componentDidMount() {
    const getTop = async (url, subtype) => {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.status !== 400) {
        if (subtype === helperVariables.subTypeAnime) {
          await this.setState({
            topAnime: [...data.top]
          });
        } else if (subtype === helperVariables.subTypeManga) {
          await this.setState({
            topManga: [...data.top]
          });
        }
      } else {
        throw data.message;
      }

      return Math.ceil(data.top.length / helperVariables.topItemsToReturn);
    };

    getTop(helperVariables.fetchAnime, helperVariables.subTypeAnime).then(
      data => {
        this.setState({
          totalPagesAnime: data
        });
      }
    );

    getTop(helperVariables.fetchManga, helperVariables.subTypeManga).then(
      data => {
        this.setState({
          totalPagesManga: data
        });
      }
    );
  }

  fetchNewPage = (page, subtype) => {
    if (subtype === helperVariables.subTypeAnime) {
      this.setState({
        currentPageAnime: page
      });
    } else if (subtype === helperVariables.subTypeManga) {
      this.setState({
        currentPageManga: page
      });
    } else if (subtype === helperVariables.subTypeSearch) {
      this.setState({
        currentPageSearch: page
      });
    }
  };

  handleSearch = clicked => {
    if (clicked) {
      this.setState({
        search: true
      });
    } else {
      this.setState({
        search: false
      });
    }
  };

  handleSearchQuery = async e => {
    await this.setState({
      searchQuery: e?.target !== undefined ? e?.target?.value : ''
    });

    const { searchQuery } = this.state;

    // using the search endpoint
    const responseAnime = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${searchQuery}`
    );
    const animeJSON = await responseAnime.json();

    if (animeJSON.status >= 400) {
      this.setState({
        queryError: animeJSON.message
      });
    } else {
      this.setState({
        queryResults: [...animeJSON.results],
        queryError: ''
      });
    }
  };

  render() {
    const {
      currentPageSearch,
      search,
      queryResults,
      queryError,
      searchQuery
    } = this.state;

    const animeProps = {
      topSubtype: this.state.topAnime,
      totalPages: this.state.totalPagesAnime,
      currentPage: this.state.currentPageAnime,
      newPage: this.fetchNewPage,
      offset: helperFunctions.offset(this.state.currentPageAnime)
    };

    const mangaProps = {
      topSubtype: this.state.topManga,
      totalPages: this.state.totalPagesManga,
      currentPage: this.state.currentPageManga,
      newPage: this.fetchNewPage,
      offset: helperFunctions.offset(this.state.currentPageManga)
    };

    return (
      <>
        <SearchBar
          title={helperVariables.title}
          searchRef={this.searchInput}
          handleSearchClick={this.handleSearch}
          handleSearchQuery={this.handleSearchQuery}
          searchQuery={searchQuery}
        />
        {search || searchQuery.length !== 0 ? (
          <>
            {queryError.length !== 0 ? (
              <Box display='flex' justifyContent='center' m={15}>
                <h1>{queryError}</h1>
              </Box>
            ) : (
              <>
                <Section
                  sectionTitle='Search Results'
                  topSubtype={queryResults}
                  totalPages={Math.ceil(
                    queryResults.length / helperVariables.topItemsToReturn
                  )}
                  currentPage={currentPageSearch}
                  subType={helperVariables.subTypeSearch}
                  newPage={this.fetchNewPage}
                  offset={
                    currentPageSearch * helperVariables.topItemsToReturn -
                    helperVariables.topItemsToReturn
                  }
                  topItemsToReturn={helperVariables.topItemsToReturn}
                  searchQuery={searchQuery}
                />
              </>
            )}
          </>
        ) : (
          <TopResults animeProps={animeProps} mangaProps={mangaProps} />
        )}
        <FAQ />
        <Credits />
      </>
    );
  }
}

export default Anime;
