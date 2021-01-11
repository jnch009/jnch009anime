import React from 'react';
import Box from '@material-ui/core/Box';
import TopAnime from './TopAnime';
import TopManga from './TopManga';
import pt from 'prop-types';

const TopResults = ({ animeProps, mangaProps }) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <TopAnime animeProps={animeProps} />
      <hr />
      <TopManga mangaProps={mangaProps} />
      <hr />
    </Box>
  );
};

TopResults.propTypes = {
  animeProps: pt.object.isRequired,
  mangaProps: pt.object.isRequired
};

export default TopResults;
