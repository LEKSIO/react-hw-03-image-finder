import axios from 'axios';
import { PER_PAGE } from 'utilities/constants';

const axiosGet = async ({ query, page }) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=40697905-03a35d5cf8bc79d8acf92618e&image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${PER_PAGE}`
  );
  return data;
};

export { axiosGet };
