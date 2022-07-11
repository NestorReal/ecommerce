/*
 *
 * Dashboard actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function getProducts() {
  return {
    type: constants.GET_PRODUCTS_INIT,
  };
}
