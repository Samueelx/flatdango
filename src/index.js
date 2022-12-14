const MOVIES_URL = "https://flatdango-pink.vercel.app/db.json";
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
        <div class="movie-details mt-4">
                <p class="details fs-3" id="showtime">Showtime: ${film.showtime}</p>
                <p class="details fs-3" id="runtime">Runtime: ${film.runtime} Mins</p>
                <p class="details fs-3" id="tickets">Available tickets: ${availableTickets}</p>
        </div>
        <div class="description mt-3">
            <p id="description" class="fs-5">
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
  const ul = document.querySelector("#films");

  ul.insertAdjacentHTML(
    "afterbegin",
    `<li class="mt-2 mb-2 film item">
    <div class="card">
          <h4 class="card-title">${film.title}</h4>
          <button type="button" class="btn btn-outline-light text-dark" id ="detailsButton">View Details</button>
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
  fetch(`${MOVIES_URL}`)
    .then((response) => response.json())
    .then((data) => {
      firstMovie(data.films[0]);
    });
};

/**Fetch all films*/
const fetchAll = (MOVIES_URL) => {
  fetch(MOVIES_URL)
    .then((response) => response.json())
    .then((data) => {
      data.films.forEach((film) => {
        createFilms(film);
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAll(MOVIES_URL);
  fetchFirst(MOVIES_URL);
});
