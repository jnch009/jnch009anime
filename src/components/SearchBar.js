import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  adornmentHeight: {
    height: 'auto',
  },
  clearSearch: {
    cursor: 'pointer',
    color: 'white',
    transition: 'color 0.5s',
    '&:hover': {
      color: 'black',
    },
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [search, setSearch] = useState(false);
  const matches = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (matches === false) {
      setSearch(false);
    } else if (search) {
      props.searchRef.current.children[0].focus();
    }
  }, [search, props.searchRef, matches]);

  const { title, handleSearchClick, handleSearchQuery, searchQuery } = props;

  SearchBar.propTypes = {
    title: PropTypes.string,
    handleSearchClick: PropTypes.func.isRequired,
    handleSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string,
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography className={classes.title} variant='h4' noWrap>
            {title}
          </Typography>
          {matches ? (
            <IconButton color='inherit'>
              {search ? (
                <div className={classes.search}>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    ref={props.searchRef}
                    onBlur={() => handleSearchClick(false)}
                    onInput={(e) => handleSearchQuery(e)}
                    value={searchQuery}
                  />
                  {searchQuery ? (
                    <InputAdornment
                      position='start'
                      className={classes.adornmentHeight}
                      onClick={() => {
                        handleSearchQuery();
                        handleSearchClick(false);
                        setSearch(false);
                      }}
                    >
                      <i
                        className={`fas fa-times-circle ${classes.clearSearch}`}
                      />
                    </InputAdornment>
                  ) : null}
                </div>
              ) : (
                <SearchIcon
                  onClick={() => {
                    handleSearchClick(true);
                    setSearch(true);
                  }}
                />
              )}
            </IconButton>
          ) : (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search Anime'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onClick={() => handleSearchClick(true)}
                onBlur={() => handleSearchClick(false)}
                onInput={(e) => handleSearchQuery(e)}
                value={searchQuery}
              />
              {searchQuery ? (
                <InputAdornment
                  position='start'
                  className={classes.adornmentHeight}
                  onClick={() => {
                    handleSearchQuery();
                    handleSearchClick(false);
                  }}
                >
                  <i className={`fas fa-times-circle ${classes.clearSearch}`} />
                </InputAdornment>
              ) : null}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
