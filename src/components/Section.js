import Box from '@material-ui/core/Box';
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
  return (
    <Box mt={10}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <h1>{sectionTitle}</h1>
      </Box>
      <Grid container justify='space-evenly'>
        {topSubtype.length === 0 && subType !== `search` ? (
          <h1>Loading</h1>
        ) : (
          topSubtype
            .slice(offset, offset + topItemsToReturn)
            .map((subtype) => (
              <Card
                key={subtype.mal_id}
                id={subtype.mal_id}
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
