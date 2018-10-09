import {
  EMP_UPDATE_LIST,
  EMP_FILTER_LIST,
} from './constants';


const initialState = {
  list: {},
  filteredList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMP_FILTER_LIST:
      return Object.assign({}, state, {
        filteredList: action.payload,
      });
    case EMP_UPDATE_LIST:
      return Object.assign({}, state, {
        list: action.payload,
        filteredList: action.payload,
      });
    default:
      return state;
  }
};