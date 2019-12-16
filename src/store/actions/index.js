import { uuid } from 'uuidv4';
import { ADD_MATTER } from '../constants';

export const addMatter = text => ({
  type: ADD_MATTER,
  id: uuid(),
  payload: text
});
