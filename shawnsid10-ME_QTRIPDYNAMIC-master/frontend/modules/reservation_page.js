import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
    try {
      const data = await fetch(config.backendEndpoint + "/reservations")
      const response = await data.json();
      return response;
    } catch (error) {
      return null;
    }
  // Place holder for functionality to work in the Stubs 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //  console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length === 0){
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }

  if(reservations.length > 0){
   document.getElementById("reservation-table-parent").style.display = "block";
   document.getElementById("no-reservation-banner").style.display = "none";
    
    for(let i =0;i<reservations.length;i++){
     let div = document.querySelector("#reservation-table")
     
     let row = document.createElement("tr")
    
     div.append(row)

     let data = document.createElement("th")
     data.textContent = reservations[i].id;
     row.append(data);
 
     let data1 = document.createElement("td")
     data1.textContent = reservations[i].name;
     row.append(data1);
 
     let data2 = document.createElement("td")
     data2.textContent = reservations[i].adventureName;
     row.append(data2);
 
     let data3 = document.createElement("td")
     data3.textContent = reservations[i].person;
     row.append(data3);
 
     let date = new Date(reservations[i].date)
     let newDate = date.toLocaleDateString('en-IN');
     let data4 = document.createElement("td")
     data4.textContent = newDate;
     row.append(data4);
 
    let data5 = document.createElement("td")
    data5.textContent = reservations[i].price;
    row.append(data5);
    
    let time = new Date(reservations[i].time);
    let month = time.toLocaleString('default', { month: 'long' })
    let day = time.getDate();
    let y = time.getFullYear();
    let clock = time.toLocaleTimeString();
    let lowClock = clock.toLowerCase();
    let bookingDate = `${day} ${month} ${y}, ${lowClock}`;
   
    let data6 = document.createElement("td");
    data6.textContent = bookingDate;
    row.append(data6); 
    
    let data7 = document.createElement("td");
    let btn = document.createElement("div");
    btn.setAttribute("id",reservations[i].id);
    btn.setAttribute("class","reservation-visit-button");
    let a = document.createElement("a");
    a.setAttribute("href",`../detail/?adventure=${reservations[i].adventure}`);
    a.textContent = "Visit Adventure";
    btn.append(a);
    data7.append(btn);
    row.append(data7);
    }

  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}
  
export { fetchReservations, addReservationToTable };
