/**
 *
 * ProductDetails
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import auth from 'utils/auth';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExitToApp from '@material-ui/icons/ExitToApp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProductDetails from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

export function ProductDetails(props) {
  useInjectReducer({ key: 'productDetails', reducer });
  useInjectSaga({ key: 'productDetails', saga });

  const classes = useStyles();

  useEffect(() => {
    fetchMoviesJSON();
  }, []);

  async function fetchMoviesJSON() {
    const productID = window.location.pathname.split('/')[2];
    const response = await fetch(
      `https://fakestoreapi.com/products/${productID}`,
    );
    const productData = await response.json();
    setProduct(productData);
  }

  const [product, setProduct] = useState(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Ecommerce-test
          </Typography>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={() => auth.logout()}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="flex-end">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => props.history.goBack()}
        >
          <KeyboardReturnIcon />
        </IconButton>
      </Grid>

      {product !== null ? (
        <Grid container justifyContent="center" style={{ padding: '50px' }}>
          <Grid item xs={12} sm={5}>
            <img src={product.image} alt={product.title} width="400px" />
          </Grid>
          <Grid item xs={12} sm={7}>
            <h1>{product.title}</h1>
            <h2>{product.category}</h2>
            <br />
            <h4>{product.description}</h4>
            <br />
            <h1>${product.price}</h1>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
}

ProductDetails.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  productDetails: makeSelectProductDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProductDetails);
