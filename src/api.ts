import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '9fabcfbbc014bf7f64c9dcf89da12f67';

export async function getSearchKeyword(query: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false,
      },
    });

    return response.data.results; // Extract only the list of movies
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}
