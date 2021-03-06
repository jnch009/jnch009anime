import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import { helperVariables } from '../utility';

import Card from './Card';

const Section = ({ sectionTitle, subType, sectionProps }) => {
  const {
    offset,
    topSubtype,
    searchQuery,
    totalPages,
    currentPage,
    newPage
  } = sectionProps;

  const sectionItemsLength = offset + helperVariables.topItemsToReturn;

  let sizing;
  if (topSubtype.slice(offset, sectionItemsLength).length === 1) {
    sizing = 12;
  } else if (topSubtype.slice(offset, sectionItemsLength).length === 2) {
    sizing = 6;
  } else if (topSubtype.slice(offset, sectionItemsLength).length === 3) {
    sizing = 4;
  } else {
    sizing = 3;
  }

  return (
    <Box
      mt={10}
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <h1>{sectionTitle}</h1>
      <Grid container justify='center'>
        {topSubtype.length === 0 && searchQuery?.length >= 1 ? (
          <CircularProgress />
        ) : (
          topSubtype.slice(offset, sectionItemsLength).map(subtype => (
            <Grid
              key={subtype.mal_id}
              container
              item
              justify='center'
              xs={12}
              md={6}
              lg={6}
              xl={sizing}
            >
              <Card
                key={subtype.mal_id}
                id={subtype.mal_id}
                image={subtype.image_url}
                title={subtype.title}
                startDate={subtype.start_date}
                type={subType}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box display='flex' justifyContent='center'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => newPage(page, subType)}
        />
      </Box>
    </Box>
  );
};

// for validating prop types
Section.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  subType: PropTypes.string.isRequired,
  sectionProps: PropTypes.object.isRequired,
  topItemsToReturn: PropTypes.number.isRequired
};

export default Section;
