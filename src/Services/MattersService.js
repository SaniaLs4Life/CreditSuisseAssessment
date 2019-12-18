import axios from 'axios';


export const MattersService = {
  getMatters: (page, search, sortBy) => {
    return axios.get(`http://localhost:9000/Requests?_page=${page}&_limit=10&q=${search}&_sort=${sortBy.field}&_order=${sortBy.type}`);
  }
};
