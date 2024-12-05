import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelectElement = document.querySelector('.breed-select');
  const breedSelect = new SlimSelect({
    select: breedSelectElement
  });

  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  loader.style.display = 'block';
  breedSelectElement.style.display = 'none';
  error.style.display = 'none';

  try {
    const breeds = await fetchBreeds();
    breedSelect.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
    breedSelectElement.style.display = 'block';
  } catch (err) {
      Notiflix.Notify.failure('Oooops!Something is NOK')
   // error.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }

  breedSelectElement.addEventListener('change', async (event) => {
    const breedId = event.target.value;
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    error.style.display = 'none';

    try {
      const catData = await fetchCatByBreed(breedId);
      const cat = catData[0];
      catInfo.innerHTML = `
        <img src="${cat.url}" alt="${cat.breeds[0].name}" />
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
      `;
      catInfo.style.display = 'block';
    } catch (err) {
      Notiflix.Notify.failure('Oooops!Something is NOK')
        //error.style.display = 'block';
    } finally {
      loader.style.display = 'none';
    }
  });
});
