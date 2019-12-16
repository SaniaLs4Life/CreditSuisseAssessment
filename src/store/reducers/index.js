import { LOAD_MATTERS } from '../constants';

const initialState = {
  matters: []
};

const matter = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATTERS:
      return {
        ...state,
        matters: action.payload
      };
    default:
      return state;
  }
};

export default matter;
