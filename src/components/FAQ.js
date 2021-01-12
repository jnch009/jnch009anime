import React from 'react';
import Box from '@material-ui/core/Box';

const FAQ = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <h2>{`What's the difference between Manga and Anime?`}</h2>
      <p>
        To oversimplify manga vs. anime, anime are TV shows or movies, while
        manga are comic books or graphic novels.
        <br />
        <br />
        For more information, here is the source:
        <a href='https://writingexplained.org/anime-vs-manga-difference'>
          https://writingexplained.org/anime-vs-manga-difference
        </a>
      </p>
    </Box>
  );
};

export default FAQ;
