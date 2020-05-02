import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import React from 'react';

import Card from './Card';

const Section = ({
  sectionTitle,
  topSubtype,
  totalPages,
  currentPage,
  subType,
  newPage,
  offset,
  topItemsToReturn,
}) => {
  let sizing;
  if (topSubtype.slice(offset, offset + topItemsToReturn).length === 1) {
    sizing = 12;
  } else if (topSubtype.slice(offset, offset + topItemsToReturn).length === 2) {
    sizing = 6;
  } else if (topSubtype.slice(offset, offset + topItemsToReturn).length === 3) {
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
        {topSubtype.length === 0 && subType !== `search` ? (
          <CircularProgress />
        ) : (
          topSubtype.slice(offset, offset + topItemsToReturn).map((subtype) => (
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
  topSubtype: PropTypes.instanceOf(Array).isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  subType: PropTypes.string.isRequired,
  newPage: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  topItemsToReturn: PropTypes.number.isRequired,
};

export default Section;
