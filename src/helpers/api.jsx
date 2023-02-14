import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28877724-a03a9cbe7251f515debe20b20';

axios.defaults.baseURL = BASE_URL;

axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchPhotosByQuery = async (query, page = 1) => {
  const { data } = await axios.get(`?q=${query}&key=${API_KEY}&page=${page}`);
  return data;
};
