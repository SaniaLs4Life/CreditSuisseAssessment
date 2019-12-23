import axios from 'axios';

export const MattersService = {
  getMatters: (page, search, sortBy) => {
    return axios.get(
      `http://localhost:9000/Requests?_page=${page}&_limit=10&q=${search}&_sort=${sortBy.field}&_order=${sortBy.type}`
    );
  },
  addMatter: data => {
    return axios.post('http://localhost:9000/Requests', data);
  },
  getMatterById: id => {
    return axios.get(`http://localhost:9000/Requests/?id=${id}`);
  },
  updateMatterById: (id, data) => {
    return axios.put(`http://localhost:9000/Requests/${id}`, data);
  },
  sendEmail: email => {
    return axios.post('http://localhost:9000/Email', email);
  }
};
