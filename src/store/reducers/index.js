import { LOAD_MATTERS } from '../constants';

const initialState = {
  matters: [],
  user: {
    DisplayName: 'Hakan GENC',
    Name: 'Hakan',
    Surname: 'Genc',
    Department: 'IT',
    Email: 'hakançgenc@company.com',
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
    default:
      return state;
  }
};

export default matter;
