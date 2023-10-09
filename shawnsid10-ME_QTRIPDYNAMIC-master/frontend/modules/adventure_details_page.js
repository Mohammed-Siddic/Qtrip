import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{ 
    const urlparams = new URLSearchParams(search);
    const param1 = urlparams.get("adventure")
    return param1;
  }
  catch(error){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let data1 = await fetch (config.backendEndpoint + "/adventures/detail/?adventure="+adventureId)
    let res1 = await data1.json();
    return res1;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //  console.log(adventure);
   let {name,subtitle,images,content} = adventure;
  //  console.log(name);
  //  console.log(content);
  //  console.log(images[0]);
   let h1 = document.querySelector("#adventure-name");
   h1.textContent = name;

   let p = document.querySelector("#adventure-subtitle");
   p.textContent = subtitle;

   let context = document.querySelector("#adventure-content");
   context.textContent = content;
   
   images.forEach((element)=>{
    let div = document.querySelector("#photo-gallery")
    let div1 = document.createElement("div")
    div1.innerHTML = `<img src="${element}" alt="" class="activity-card-image">`
    div.append(div1)
   })

 }

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
      let div = document.querySelector("#photo-gallery")
      div.className = "carousel slide";
      div.setAttribute = ("data-bs-ride","carousel")

     div.innerHTML = `
     <div class="carousel-indicators">
     <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
     <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="1" aria-label="Slide 2"></button>
     <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="2" aria-label="Slide 3"></button>
     </div>

     <button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
     </button>
 `
    let div1 = document.createElement("div")
      div1.className = "carousel-inner";
      div.append(div1);
 
       for(let i=0;i<images.length;i++){
        let div2 = document.createElement("div");
        div2.className = "carousel-item active activity-card-image"
        
        let div3 = document.createElement("div");
        div3.className = "carousel-item ";

         if(i === 0){
            div2.innerHTML = `<img src="${images[i]}" alt="" class="activity-card-image">`;
            div1.append(div2) ;
        }
         else{
            div3.innerHTML = `<img src="${images[i]}" alt="" class="activity-card-image">`;
            div1.append(div3)
         }
      }

 }

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available === true){
    let div = document.querySelector("#reservation-panel-sold-out")
    div.style.display = "none";
    let div1 = document.querySelector("#reservation-panel-available");
    div1.style.display = "block";
  }else{
    let div = document.querySelector("#reservation-panel-sold-out")
    div.style.display = "block";
    let div1 = document.querySelector("#reservation-panel-available");
    div1.style.display = "none";
  }

  let div3 = document.querySelector("#reservation-person-cost");
  div3.textContent = adventure.costPerHead;
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  if(persons){
     let div = document.querySelector("#reservation-cost")
     div.textContent = persons * adventure.costPerHead
  }
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let form = document.querySelector("#myForm")
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let  data={
      name:form.elements["name"].value,
      date:new Date(form.elements["date"].value),
      person:form.elements["person"].value,
      adventure:adventure["id"]
    }
    console.log(data);
    try{
      const url=`${config.backendEndpoint}/reservations/new`;
      const res=await fetch(url,{
        method:"POST",
       headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      });
     alert("success");
     window.location.reload();
      }
    catch(error){
      console.log(error);
      alert("failed");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let div = document.querySelector("#reserved-banner");
    if(adventure.reserved === true){
      div.style.display = "block";
    }else{
      div.style.display = "none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
