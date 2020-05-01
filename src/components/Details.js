import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

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
}));

export default function Details({ openModal, setModal, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (openModal) {
      console.log(id);
      setOpen(true);
      fetch(`https://api.jikan.moe/v3/anime/${id}/pictures`)
        .then((resp) => {
          if (resp.status === 404) {
            setImageError('404: Resource could not be found');
          } else if (resp.status === 403) {
            setImageError('403: Try requesting this resource later');
          }
          return resp.json();
        })
        .then((data) => data.pictures)
        .then((pictures) =>
          setImages([...pictures.map((picture) => picture.small).slice(0, 3)]),
        )
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
          <div
            className={classes.paper}
            style={{ overflowY: 'scroll', height: '75vh' }} // media query needed here
          >
            <h2 id='transition-modal-title'>Transition modal</h2>
            <p id='transition-modal-description'>
              react-transition-group animates me.
            </p>
            <Box display='flex' flexDirection='column' alignItems='center'>
              {images.length !== 0 ? (
                images.map((image) => (
                  <img
                    className='animeImages'
                    key={image}
                    src={image}
                    width={150}
                    height={200}
                    alt=''
                  />
                ))
              ) : (
                <>
                  <h1>{imageError}</h1>
                </>
              )}
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
