const MOVIES_URL = "http://localhost:3000/films";
const mainContainer = document.querySelector(".main-container");

const firstMovie = (film) => {
  /**create a div where our first movie shall be rendered */
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("main-movie");

  /**Calculate the number of available tickets */
  let availableTickets = film.capacity - film.tickets_sold;

  mainDiv.innerHTML = `
        <h3 class="pt-5 pb-3">${film.title}</h3>
        <img src="${film.poster}" alt="Main Movie" class="img-fluid" id="mainMovie">
        <div class="movie-details mt-3">
                <p class="details" id="showtime">Showtime: ${film.showtime}</p>
                <p class="details" id="runtime">Runtime: ${film.runtime} Mins</p>
                <p class="details" id="tickets">Available tickets: ${availableTickets}</p>
        </div>
        <div class="description mt-3">
            <p id="description">
                ${film.description}
            </p>
            <button type="button" class="btn btn-outline-dark mt-3 mb-5">Buy Tickets</button>
        </div>
    `;
  /**Append the div into out main comtainer div */
  mainContainer.appendChild(mainDiv);

  /**Purchase tickets and update DOM */
  const buyTicket = mainDiv.querySelector(".btn-outline-dark");
  buyTicket.addEventListener("click", () => {
    const tickets = mainDiv.querySelector("p#tickets");
    if (availableTickets > 0) {
      --availableTickets;
      tickets.textContent = `Available tickets: ${availableTickets}`;
    } else buyTicket.textContent = "SOLD OUT!";
  });
};

/**Create and render the menu list of films */
const createFilms = (film) => {
  //   const menuDiv = document.querySelector("div.movies-menu");
  const ul = document.querySelector("#films");

  ul.insertAdjacentHTML(
    "afterbegin",
    `<li class="mt-2 mb-2 film item">
    <div class="card">
        <img src="${film.poster}" alt="" class="card-img-top img-fluid">
        <div class="card-body">
            <h4 class="card-title">${film.title}</h4>
            <button type="button" class="btn btn-outline-dark" id ="detailsButton">View Details</button>
        </div>
    </div>
    </li>`
  );

  /**add event listener to view a movie's details */
  const detailsButton = ul.querySelector("#detailsButton");
  detailsButton.addEventListener("click", () => {
    const mainDiv = mainContainer.querySelector('div.main-movie');
    mainDiv.remove();
    firstMovie(film);
  });
};

/**Fetch the first movie */
const fetchFirst = (MOVIES_URL) => {
  fetch(`${MOVIES_URL}/1`)
    .then((response) => response.json())
    .then((film) => {
      firstMovie(film);
    });
};

/**Fetch all films*/
const fetchAll = (MOVIES_URL) => {
  fetch(MOVIES_URL)
    .then((response) => response.json())
    .then((films) => {
      // console.log(films);
      //   createFilms(films);
      films.forEach((film) => {
        createFilms(film);
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAll(MOVIES_URL);
  fetchFirst(MOVIES_URL);
});
