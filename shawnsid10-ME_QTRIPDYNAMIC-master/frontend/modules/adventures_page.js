
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlparams = new URLSearchParams(search);
  const param1 = urlparams.get("city")
  return param1;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data1 = await fetch (config.backendEndpoint + "/adventures/?city="+city)
    let res1 = await data1.json();
    return res1;
  } catch (error) {
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
 
  adventures.forEach((element)=>{
    let{id, name, category, image, costPerHead, duration} = element;
    let div = document.querySelector("#data")
    let div1 = document.createElement("div")
    div1.className = "col-sm-12 col-md-4 col-lg-3 position-relative my-2";
    div1.innerHTML = `
    <a href="./detail/?adventure=${id}" id=${id} >
    <div class="activity-card">
    <img src=${image} alt="" />
    <div class="d-flex justify-content-between px-3 pt-3">
    <h6>${name}</h6>
    <h6>₹ ${costPerHead} </h6>
    </div>
    <div class="d-flex justify-content-between px-3 py-2">
    <h6>Duration</h6>
    <h6>${duration} Hours</h6>
    </div>
  </div>
  <div class="category-banner">
  ${category}
  </div>
   </a>
 `
 div.append(div1)
})
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list,high,low)
  const newList = list.filter((element)=> low <= element.duration && element.duration <= high);
  return newList;
}
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(categoryList)
  const newList = list.filter((element)=>
    categoryList.includes(element.category)
  );
  return newList;
}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters.category.length)

  if(filters.category.length > 0){
    list = filterByCategory(list,filters.category)
  }

  if(filters.duration.length > 0){
    list = filterByDuration(list,
    filters.duration.split("-")[0],
    filters.duration.split("-")[1]
    );
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let getStorage = JSON.parse(localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return getStorage;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  filters["category"].forEach((element) => {
    let div = document.createElement("div");
    div.className = "category-filter";
    div.innerHTML = `<div>${element}</div>`;
    document.getElementById("category-list").append(div)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
