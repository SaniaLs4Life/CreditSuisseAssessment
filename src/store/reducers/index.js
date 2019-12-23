import { LOAD_MATTERS, SET_VISIBILITY, SET_CURRENT_USER } from '../constants';

const initialState = {
  matters: [],
  isPopupMessageVisible: false,
  user: {
    DisplayName: 'Hakan GENC',
    Name: 'Hakan',
    Surname: 'Genc',
    Department: 'IT',
    Email: 'hakan.genc@company.com',
    Id: 1234567890,
    Manager: true,
    Roles: ['Owner']
  }
};

const matter = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATTERS:
      return {
        ...state,
        matters: action.payload
      };
    case SET_VISIBILITY:
      return {
        ...state,
        isPopupMessageVisible: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: { ...state.user, Roles: action.payload ? [] : ['Owner'] }
      };
    default:
      return state;
  }
};

export default matter;
