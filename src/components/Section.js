import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Card from './Card';

const subTypeAnime = 'anime';
const subTypeManga = 'manga';
const fetchAnime = `https://api.jikan.moe/v3/top/anime`;
const fetchManga = `https://api.jikan.moe/v3/top/manga`;
const topItemsToReturn = 5;

const fetchNewPage = (page, subtype) => {
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
};

const Section = ({
  sectionTitle,
  topSubtype,
  totalPages,
  currentPage,
  subType,
}) => {
  return (
    <Box mt={10}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <h1>{sectionTitle}</h1>
      </Box>
      <Grid container justify='space-evenly'>
        {topSubtype.length === 0 ? (
          <h1>Loading</h1>
        ) : (
          topSubtype.map((subtype) => (
            <Card
              key={subtype.mal_id}
              image={subtype.image_url}
              title={subtype.title}
              startDate={subtype.start_date}
            />
          ))
        )}
      </Grid>
      <Box display='flex' justifyContent='center'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => fetchNewPage(page, subType)}
        />
      </Box>
    </Box>
  );
};

export default Section;
