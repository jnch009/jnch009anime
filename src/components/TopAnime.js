import React from 'react';
import Section from './Section';
import pt from 'prop-types';

const TopAnime = ({ animeProps }) => {
  return (
    <Section
      sectionTitle='Top Anime!'
      subType='anime'
      sectionProps={animeProps}
    />
  );
};

TopAnime.propTypes = {
  animeProps: pt.object.isRequired
};

export default TopAnime;
