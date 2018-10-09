import {
  EMP_FILTER_LIST,
  EMP_UPDATE_LIST,
} from './constants';

export const updateList = (payload) => ({
  type: EMP_UPDATE_LIST,
  payload,
});

export const filterList = (payload) => ({
  type: EMP_FILTER_LIST,
  payload,
});
