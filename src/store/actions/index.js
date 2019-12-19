import { LOAD_MATTERS, SET_VISIBILITY } from '../constants';

export const loadMatters = matters => ({
  type: LOAD_MATTERS,
  payload: matters
});

export const setPopupVisibility = status => ({
  type: SET_VISIBILITY,
  payload: status
});
