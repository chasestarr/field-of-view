import { map } from 'lodash';

import { REQUEST_GISTS } from '../actions';

const initialState = {
  byId: {},
  allIds: [],
  isFetching: false,
  failed: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GISTS.REQUEST:
      return {
        ...state,
        isFetching: true,
        failed: false,
      };

    case REQUEST_GISTS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: action.payload,
        allIds: map(action.payload, 'id'),
      };

    case REQUEST_GISTS.FAILURE:
      return {
        ...state,
        isFetching: false,
        failed: true,
      };

    default:
      return state;
  }
}
