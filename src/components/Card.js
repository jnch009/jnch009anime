import Box from '@material-ui/core/Box';
import teal from '@material-ui/core/colors/teal';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

import Details from './Details';

import './Card.css';

const color = teal[500];

const Card = ({ id, image, title, startDate, type }) => {
  const [hoverDetails, setHoverDetails] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <Box
      bgcolor={color}
      display='flex'
      flexDirection='column'
      alignItems='center'
      height={500}
      my={2}
      p='5rem'
    >
      <Details
        openModal={modal}
        setModal={setModal}
        id={id}
        image={image}
        type={type}
      />
      <Box
        className={hoverDetails ? 'image hvr-fade' : null}
        onPointerEnter={() => {
          setHoverDetails(true);
        }}
        onPointerLeave={() => setHoverDetails(false)}
        onClick={() => setModal(true)}
      >
        <img
          className={hoverDetails ? 'imgOpacity' : 'imgHover'}
          src={image}
          alt=''
        />
        <p className={hoverDetails ? null : 'hidden'}>Click for more details</p>
      </Box>
      <Typography component={'div'} align='center' className='animeInfo'>
        <h4>
          <strong>{title}</strong>
        </h4>
        <h6>Debut: {startDate}</h6>
      </Typography>
    </Box>
  );
};

export default Card;
