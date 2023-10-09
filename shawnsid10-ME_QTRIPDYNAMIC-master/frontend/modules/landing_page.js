import config from "../conf/index.js";


async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data)
  try {
    let data = await fetch (config.backendEndpoint + "/cities")
    let res = await data.json();
    return res;
  } catch (error) {
    return null;
  }
}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div1 = document.createElement("div")
  div1.className = "col-sm-12 col-md-6 col-lg-3 my-2";
  div1.innerHTML = `
   <a href="./pages/adventures/?city=${id}" id=${id}>
  <div class="tile">
  <img src=${image} alt="">
  <section class="tile-text">
      <h5>${city}</h5>
      <p>${description}</p>
  </section>
    </div>
  </a>
  `
  let div = document.querySelector("#data")
  div.append(div1)
}

export { init, fetchCities, addCityToDOM };

