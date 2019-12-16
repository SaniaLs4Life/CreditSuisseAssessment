import {ADD_MATTER} from '../constants';

const initialState = {
  name: 'Old Value'
};

const matter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATTER:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
};

export default matter;
