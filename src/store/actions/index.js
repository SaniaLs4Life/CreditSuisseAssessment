import { LOAD_MATTERS, SET_VISIBILITY, SET_CURRENT_USER } from '../constants';

export const loadMatters = matters => ({
  type: LOAD_MATTERS,
  payload: matters
});

export const setPopupVisibility = status => ({
  type: SET_VISIBILITY,
  payload: status
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});
