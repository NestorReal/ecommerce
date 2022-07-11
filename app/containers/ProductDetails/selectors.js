import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productDetails state domain
 */

const selectProductDetailsDomain = state =>
  state.productDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductDetails
 */

const makeSelectProductDetails = () =>
  createSelector(
    selectProductDetailsDomain,
    substate => substate,
  );

export default makeSelectProductDetails;
export { selectProductDetailsDomain };
