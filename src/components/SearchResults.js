import React from 'react';
import Box from '@material-ui/core/Box';
import Section from './Section';
import { helperVariables } from '../utility';
import pt from 'prop-types';

const SearchResults = ({ searchProps }) => {
  return searchProps.queryError.length !== 0 ? (
    <Box display='flex' justifyContent='center' m={15}>
      <h1>{searchProps.queryError}</h1>
    </Box>
  ) : (
    <Section
      sectionTitle='Search Results'
      subType={helperVariables.subTypeSearch}
      sectionProps={searchProps}
    />
  );
};

SearchResults.propTypes = {
  searchProps: pt.object.isRequired,
};

export default SearchResults;
