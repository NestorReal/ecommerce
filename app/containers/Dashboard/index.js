/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ProductCard from 'components/ProductCard';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import auth from 'utils/auth';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getProducts } from './actions';

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

export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const { products } = props.dashboard;

  useEffect(() => {
    props.dispatch(getProducts());
  }, []);

  let productList = [];
  if (Object.keys(products).length !== 0) {
    productList = products.map(product => (
      <Grid
        item
        xs={3}
        sm={3}
        onClick={() => props.history.push(`/product/${product.id}`)}
      >
        <ProductCard
          category={product.category}
          description={product.description}
          id={product.id}
          image={product.image}
          price={product.price}
          title={product.title}
        />
      </Grid>
    ));
  }

  const classes = useStyles();
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
      <Grid container spacing={2} style={{ padding: '10px' }}>
        {productList}
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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

export default compose(withConnect)(Dashboard);
