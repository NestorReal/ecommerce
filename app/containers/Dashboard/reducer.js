/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  products: {},
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.DEFAULT_ACTION:
        break;
      case constants.GET_PRODUCTS_SUCCESS:
        draft.products = action.response;
        break;
    }
  });

export default dashboardReducer;
