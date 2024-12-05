import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = "live_MGOE2RQNqfFk5iKw8MS7UC27CGjHIhSTXaUEXbiP1OjHTqUu32VUIB6EFgedxxkY";

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    
      return response.data;
  } catch (error) {
    console.error('Eroare la obținerea listelor de rase:', error);
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    console.error('Eroare la obținerea informațiilor despre pisică:', error);
    throw error;
  }
}
