import { uuid } from 'uuidv4';
import { LOAD_MATTERS, LOAD_ALL_MATTERS } from '../constants';

export const loadMatters = matters => ({
  type: LOAD_MATTERS,
  id: uuid(),
  payload: matters
});
