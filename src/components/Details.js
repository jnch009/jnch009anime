import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import Card from './Card';

import './Details.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Details({ openModal, setModal, id, image }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [characterDetails, setCharacterDetails] = useState([]);
  const [characterError, setcharacterError] = useState('');
  const [error, setError] = useState('');

  const matches = useMediaQuery('(max-width:480px)');

  useEffect(() => {
    if (openModal) {
      console.log(id);
      setOpen(true);

      fetch(`https://api.jikan.moe/v3/anime/${id}`)
        .then((resp) => {
          if (resp.status === 404) {
            setError('404: Anime could not be found');
          } else if (resp.status === 403) {
            setError('403: Try requesting this resource later');
          }
          return resp.json();
        })
        .then((data) => setModalDetails({ ...data }))
        .catch((err) => console.log(`Issues fetching: ${err}`));

      fetch(`https://api.jikan.moe/v3/anime/${id}/characters_staff`)
        .then((resp) => {
          if (resp.status === 404) {
            setcharacterError('404: Characters could not be found');
          } else if (resp.status === 403) {
            setcharacterError('403: Try requesting this resource later');
          }
          return resp.json();
        })
        .then((data) => {
          if (data.characters.length === 0) {
            setcharacterError('No Characters Found');
          } else {
            setCharacterDetails([...data.characters]);
          }
        })
        .catch((err) => console.log(`Issues fetching: ${err}`));
    }
  }, [openModal, id]);

  const handleClose = () => {
    setOpen(false);
    setModal(false);
  };

  return (
    <div onBlur={handleClose}>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          {/* {matches ?  :} */}

          <div
            className={classes.paper}
            style={{ overflowY: 'scroll', height: '75vh', width: '70vw' }} // media query needed here
          >
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Box m={5}>
                <img src={image} alt='' width={300} height={500} />
              </Box>
              <Box display='flex' flexDirection='column'>
                {Object.keys(modalDetails).length !== 0 ? (
                  <>
                    <h2>{modalDetails.title}</h2>
                    <h3>Score: {modalDetails.score} / 10</h3>
                    <p>{modalDetails.synopsis}</p>
                  </>
                ) : (
                  <>
                    <CircularProgress />
                    <h1>{error}</h1>
                  </>
                )}
              </Box>
            </Box>

            <h1>Cast</h1>
            <Box display='flex' flexDirection='column'>
              {characterDetails.length !== 0 ? (
                characterDetails.map((character) => (
                  <Card
                    key={character.mal_id}
                    id={character.mal_id}
                    image={character.image_url}
                    title={character.name}
                    startDate={character?.voice_actors[0]?.name}
                  />
                ))
              ) : (
                <>
                  {characterError !== '' ? (
                    <h1>{characterError}</h1>
                  ) : (
                    <CircularProgress />
                  )}
                </>
              )}
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
