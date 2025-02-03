/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-5-using-the-vscode-debugger

Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);
  console.log(
    `Birth: ${birth.date}, ${birth.place.city.en}, ${birth.place.country.en}`
  );
  if (death) {
    if (death.place.city) {
      const city = death.place.city.en;

      console.log(`Death: ${death.date}, ${city}, ${death.place.country.en}`);
    }
  }
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  const url =
    'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en';
  try {
    const { laureates } = await getData(url);
    renderLaureates(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();
