/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log(`HTTP Error: ${response.statusText}`);
      }
      // I used this so that the fetchData can response both json and image data type
      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/json')) {
        return response.json();
      } else if (contentType.includes('image')) {
        return response.blob();
      } else {
        console.log('Unknown content type.');
      }
    })
    .catch((error) => {
      console.log(`Network Error: ${error.message}`);
    })
    .finally(() => {
      console.log('Settled');
    });
}

async function fetchAndPopulatePokemons(url) {
  try {
    const result = await fetchData(url);
    return result;
  } catch (error) {
    console.log('Error occurred: ', error.message);
  }
}

async function fetchImage(url) {
  try {
    const img = await fetchData(url);
    return img.sprites.back_default;
  } catch (error) {
    console.log('Error Occurred.', error.message);
  }
}

async function main() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  const selectEl = document.createElement('select');

  const buttonEl = document.createElement('button');
  buttonEl.classList.add('pokemon-btn');
  buttonEl.innerText = 'Get Pokemon!';
  document.body.appendChild(buttonEl);
  document.body.appendChild(selectEl);

  buttonEl.addEventListener('click', async () => {
    const jsonData = await fetchAndPopulatePokemons(url);
    jsonData.results.forEach((result) => {
      const optionEl = document.createElement('option');
      optionEl.innerText = result.name;
      optionEl.value = result.url;
      selectEl.appendChild(optionEl);
    });
  });

  selectEl.addEventListener('change', async (e) => {
    const prevImg = document.querySelector('img');
    if (prevImg) prevImg.remove();

    const imgURL = e.target.value;
    const imgData = await fetchImage(imgURL);

    const img = document.createElement('img');
    img.src = imgData;
    document.body.appendChild(img);
  });
}

window.addEventListener('load', main);
