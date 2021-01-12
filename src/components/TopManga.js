import React from 'react';
import Section from './Section';
import pt from 'prop-types';

const TopManga = ({ mangaProps }) => {
  return (
    <Section
      sectionTitle='Top Manga!'
      subType='manga'
      sectionProps={mangaProps}
    />
  );
};

TopManga.propTypes = {
  mangaProps: pt.object.isRequired
};

export default TopManga;
